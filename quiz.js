(() => {
  const slot = document.getElementById('lesson-slot');
  if (!slot) return;

  const isQuestion = element =>
    element?.tagName === 'P' && element.firstElementChild?.tagName === 'STRONG';

  const isBoundary = element =>
    !element || isQuestion(element) || element.matches('h2, h3');

  const isEmptyOptionList = element => {
    if (element?.tagName !== 'OL' || element.children.length !== 1) return false;
    const item = element.firstElementChild;
    return item.tagName === 'LI' && !item.textContent.trim();
  };

  function normalizeCodeOptions(question) {
    let cursor = question.nextElementSibling;
    if (!isEmptyOptionList(cursor)) return null;

    const merged = document.createElement('ol');
    const fragmentsToRemove = [];

    while (isEmptyOptionList(cursor)) {
      const markerList = cursor;
      const item = document.createElement('li');
      fragmentsToRemove.push(markerList);
      cursor = markerList.nextElementSibling;

      while (!isBoundary(cursor) && !isEmptyOptionList(cursor)) {
        const next = cursor.nextElementSibling;
        item.append(cursor);
        cursor = next;
      }

      const children = [...item.children];
      if (children.length >= 2) merged.append(item);
    }

    if (!merged.children.length) return null;
    fragmentsToRemove.forEach(node => node.remove());
    question.after(merged);
    return merged;
  }

  function makeInteractive(list) {
    if (!list || list.dataset.quizReady === 'true') return;

    const items = [...list.children].filter(item => item.tagName === 'LI');
    if (!items.length) return;

    items.forEach(item => {
      const children = [...item.children];
      if (children.length < 2) return;

      const optionNode = children[0];
      const feedbackNodes = children.slice(1);
      const feedbackText = feedbackNodes.map(node => node.textContent).join(' ');
      const isCorrect = /(^|\s)Đúng\./i.test(feedbackText);

      const choice = document.createElement('div');
      choice.className = 'quiz-choice';
      choice.setAttribute('role', 'button');
      choice.setAttribute('tabindex', '0');
      choice.setAttribute('aria-pressed', 'false');
      choice.append(optionNode);

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
        parent.querySelectorAll(':scope > .quiz-option').forEach(other => {
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

    if (items.some(item => item.classList.contains('quiz-option'))) {
      list.classList.add('quiz-options');
      list.dataset.quizReady = 'true';
    }
  }

  function enhance(root) {
    root.querySelectorAll('h3.quiz-heading').forEach(heading => {
      let cursor = heading.nextElementSibling;

      while (cursor && !cursor.matches('h2, h3')) {
        if (!isQuestion(cursor)) {
          cursor = cursor.nextElementSibling;
          continue;
        }

        const question = cursor;
        question.classList.add('quiz-question');

        let options = question.nextElementSibling;
        if (isEmptyOptionList(options)) {
          options = normalizeCodeOptions(question);
        }

        if (options?.tagName === 'OL') {
          makeInteractive(options);
          cursor = options.nextElementSibling;
        } else {
          cursor = question.nextElementSibling;
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
