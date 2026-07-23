(() => {
const slot = document.getElementById('lesson-slot');
if (!slot) return;
const expectedCounts = {
'abstraction-and-class': 5,
'encapsulation-and-access-specifier': 4,
'constructor-and-destructor': 5,
'struct-and-aggregate-initialization': 2,
'operator-overloading': 4,
'structured-binding': 1,
inheritance: 3,
'protected-member': 2,
'member-initializer-list': 2,
'working-with-inherited-member': 5
};
const isMarker = element =>
element?.tagName === 'P' && /^\d+\.$/.test(element.textContent.trim());
const isPrompt = element =>
element?.tagName === 'P' && /\?\s*$/.test(element.textContent.trim());
const isBoundary = element =>
!element || element.matches('h2, h3');
function findPrompt(group, heading) {
let cursor = group.previousElementSibling;
while (cursor && cursor !== heading) {
if (isPrompt(cursor)) return cursor;
cursor = cursor.previousElementSibling;
}
return null;
}
function normalizeCodeOptions(firstMarker) {
const list = document.createElement('ol');
firstMarker.before(list);
let marker = firstMarker;
while (isMarker(marker)) {
const answer = marker.nextElementSibling;
const feedback = answer?.nextElementSibling;
if (
isBoundary(answer) ||
isBoundary(feedback) ||
isMarker(answer) ||
isMarker(feedback)
) {
break;
}
const next = feedback.nextElementSibling;
const item = document.createElement('li');
marker.remove();
item.append(answer, feedback);
list.append(item);
marker = next;
}
if (!list.children.length) {
list.remove();
return null;
}
return list;
}
function makeInteractive(list, question) {
if (!list || list.dataset.quizReady === 'true') return false;
const items = [...list.children].filter(item => item.tagName === 'LI');
let converted = 0;
items.forEach(item => {
const children = [...item.children];
if (children.length < 2) return;
const answer = children[0];
const feedbackNodes = children.slice(1);
const feedbackText = feedbackNodes
.map(node => node.textContent)
.join(' ')
.trim();
const isCorrect = /(^|\s)Đúng\./i.test(feedbackText);
const choice = document.createElement('div');
choice.className = 'quiz-choice';
choice.setAttribute('role', 'radio');
choice.setAttribute('tabindex', '0');
choice.setAttribute('aria-checked', 'false');
choice.append(answer);
const feedback = document.createElement('div');
feedback.className = 'quiz-feedback';
feedback.hidden = true;
feedback.setAttribute('role', 'status');
feedback.setAttribute('aria-live', 'polite');
feedbackNodes.forEach(node => feedback.append(node));
item.classList.add('quiz-option');
item.dataset.correct = String(isCorrect);
item.append(choice, feedback);
converted += 1;
const select = () => {
const parent = item.closest('.quiz-options');
parent.querySelectorAll(':scope > .quiz-option').forEach(other => {
other.classList.remove('selected', 'correct', 'wrong');
const otherChoice = other.querySelector(':scope > .quiz-choice');
const otherFeedback = other.querySelector(':scope > .quiz-feedback');
otherChoice?.setAttribute('aria-checked', 'false');
if (otherFeedback) otherFeedback.hidden = true;
});
item.classList.add('selected', isCorrect ? 'correct' : 'wrong');
choice.setAttribute('aria-checked', 'true');
feedback.hidden = false;
};
choice.addEventListener('click', event => {
if (event.target.closest('.copy-button')) return;
select();
});
choice.addEventListener('keydown', event => {
if (event.target.closest('.copy-button')) return;
if (event.key === 'Enter' || event.key === ' ') {
event.preventDefault();
select();
}
});
});
if (!converted) return false;
list.classList.add('quiz-options');
list.dataset.quizReady = 'true';
list.setAttribute('role', 'radiogroup');
if (question) {
question.classList.add('quiz-question');
if (!question.id) {
question.id = `quiz-question-${document.querySelectorAll('.quiz-question').length + 1}`;
}
list.setAttribute('aria-labelledby', question.id);
}
return true;
}
function enhanceSection(heading) {
let cursor = heading.nextElementSibling;
while (cursor && !cursor.matches('h2, h3')) {
if (isMarker(cursor)) {
const list = normalizeCodeOptions(cursor);
if (list) {
makeInteractive(list, findPrompt(list, heading));
cursor = list.nextElementSibling;
continue;
}
}
if (cursor.tagName === 'OL') {
makeInteractive(cursor, findPrompt(cursor, heading));
}
cursor = cursor.nextElementSibling;
}
}
function audit(root) {
const lessonId = root.id;
const expected = expectedCounts[lessonId];
const actual = root.querySelectorAll('.quiz-options').length;
const unresolvedMarkers = [...root.querySelectorAll('p')]
.filter(isMarker)
.filter(marker => marker.closest('.lesson'));
const unresolvedLists = [];
root.querySelectorAll('h3.quiz-heading').forEach(heading => {
let cursor = heading.nextElementSibling;
while (cursor && !cursor.matches('h2, h3')) {
if (cursor.tagName === 'OL' && !cursor.classList.contains('quiz-options')) {
unresolvedLists.push(cursor);
}
cursor = cursor.nextElementSibling;
}
});
root.dataset.quizExpected = String(expected ?? actual);
root.dataset.quizActual = String(actual);
root.dataset.quizAudit =
actual === expected && !unresolvedMarkers.length && !unresolvedLists.length
? 'pass'
: 'fail';
if (root.dataset.quizAudit === 'fail') {
console.error('Quiz audit failed', {
lessonId,
expected,
actual,
unresolvedMarkers: unresolvedMarkers.length,
unresolvedLists: unresolvedLists.length
});
}
}
function enhance(root) {
root.querySelectorAll('h3.quiz-heading').forEach(enhanceSection);
audit(root);
}
const observer = new MutationObserver(() => {
const lesson = slot.querySelector('.lesson');
if (lesson) enhance(lesson);
});
observer.observe(slot, { childList: true, subtree: true });
const currentLesson = slot.querySelector('.lesson');
if (currentLesson) enhance(currentLesson);
})();