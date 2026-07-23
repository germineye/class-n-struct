(() => {
  const slot = document.getElementById('lesson-slot');
  if (!slot) return;

  const isQuestion = element =>
    element?.tagName === 'P' && element.firstElementChild?.tagName === 'STRONG';

  const isMarker = element =>
    element?.tagName === 'P' && /^\d+\.$/.test(element.textContent.trim());

  function makeInteractive(list) {
    if (!list || list.dataset.quizReady === 'true') return;

    const items = [...list.children].filter(item => item.tagName === 'LI');
    if (!items.length) return;

    items.forEach(item => {
      const children = [...item.children];
      if (children.length < 2) return;

      const optionNodes = children.slice(0, 1);
      const feedbackNodes = children.slice(1);
      const feedbackText = feedbackNodes.map(node => node.textContent).join(' ');
      const isCorrect = /(^|\s)Đúng\./i.test(feedbackText);

      const choice = document.createElement('div');
      choice.className = 'quiz-choice';
      choice.setAttribute('role', 'button');
      choice.setAttribute('tabindex', '0');
      choice.setAttribute('aria-pressed', 'false');

      optionNodes.forEach(node => choice.append(node));

      const feedback = document.createElement('div');
      feedback.className = 'quiz-feedback';
      feedback.hidden = true;
      feedback.setAttribute('tabindex', '-1');
      feedbackNodes.forEach(node => feedback.append(node));

      item.classList.add('quiz-option');
      item.dataset.correct = String(isCorrect);
      item.append(choice, feedback);

      const select = () => {
        const parent = item.closest('.quiz-options');
        parent.querySelectorAll('.quiz-option').forEach(other => {
          other.classList.remove('selected', 'correct', 'wrong');
          const otherChoice = other.querySelector(':scope > .quiz-choice');
          const otherFeedback = other.querySelector(':scope > .quiz-feedback');
          otherChoice?.setAttribute('aria-pressed', 'false');
          if (otherFeedback) otherFeedback.hidden = true;
        });

        item.classList.add('selected', isCorrect ? 'correct' : 'wrong');
        choice.setAttribute('aria-pressed', 'true');
        feedback.hidden = false;
        feedback.focus({ preventScroll: true });
      };

      choice.addEventListener('click', event => {
        if (event.target.closest('.copy-button')) return;
        select();
      });

      choice.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          select();
        }
      });
    });

    list.classList.add('quiz-options');
    list.dataset.quizReady = 'true';
  }

  function buildLooseList(question) {
    let cursor = question.nextElementSibling;
    if (!isMarker(cursor)) return null;

    const list = document.createElement('ol');

    while (isMarker(cursor)) {
      const marker = cursor;
      cursor = marker.nextElementSibling;
      const nodes = [];

      while (
        cursor &&
        !isMarker(cursor) &&
        !isQuestion(cursor) &&
        !cursor.matches('h2, h3')
      ) {
        const next = cursor.nextElementSibling;
        nodes.push(cursor);
        cursor = next;
      }

      marker.remove();
      if (nodes.length < 2) continue;

      const feedbackNode = nodes.pop();
      const item = document.createElement('li');
      nodes.forEach(node => item.append(node));
      item.append(feedbackNode);
      list.append(item);
    }

    if (!list.children.length) return null;
    question.after(list);
    return list;
  }

  function enhance(root) {
    root.querySelectorAll('h3.quiz-heading').forEach(heading => {
      let cursor = heading.nextElementSibling;

      while (cursor && !cursor.matches('h2, h3')) {
        if (!isQuestion(cursor)) {
          cursor = cursor.nextElementSibling;
          continue;
        }

        cursor.classList.add('quiz-question');
        let options = cursor.nextElementSibling;

        if (options?.tagName !== 'OL') {
          options = buildLooseList(cursor);
        }

        if (options?.tagName === 'OL') {
          makeInteractive(options);
          cursor = options.nextElementSibling;
        } else {
          cursor = cursor.nextElementSibling;
        }
      }
    });
  }

  const observer = new MutationObserver(() => {
    const lesson = slot.querySelector('.lesson');
    if (lesson) enhance(lesson);
  });

  observer.observe(slot, { childList: true, subtree: true });
  const currentLesson = slot.querySelector('.lesson');
  if (currentLesson) enhance(currentLesson);
})();
