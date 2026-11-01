const form = document.querySelector<HTMLFormElement>('form[name="contact"]');

if (form) {
  form.noValidate = true;
  const messages = form.dataset;

  const getMessage = (
    field: HTMLInputElement | HTMLTextAreaElement,
  ): string | undefined => {
    const { validity } = field;
    if (validity.valueMissing) {
      return messages[`${field.name}Required`];
    }
    if (validity.typeMismatch) {
      return messages[`${field.name}Invalid`];
    }
    return undefined;
  };

  const fields = Array.from(
    form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('[required]'),
  );

  const showError = (
    field: HTMLInputElement | HTMLTextAreaElement,
    message: string | undefined,
  ) => {
    const error = document.getElementById(`${field.id}-error`);
    if (!error) return;
    error.textContent = message ?? '';
    if (message) {
      field.setAttribute('aria-invalid', 'true');
      field.setAttribute('aria-describedby', error.id);
    } else {
      field.removeAttribute('aria-invalid');
      field.removeAttribute('aria-describedby');
    }
  };

  form.addEventListener('submit', (event) => {
    let firstInvalid: HTMLElement | undefined;
    for (const field of fields) {
      const message = getMessage(field);
      showError(field, message);
      if (message && !firstInvalid) firstInvalid = field;
    }
    if (firstInvalid) {
      event.preventDefault();
      firstInvalid.focus();
    }
  });

  form.addEventListener('input', (event) => {
    const field = event.target;
    if (
      (field instanceof HTMLInputElement ||
        field instanceof HTMLTextAreaElement) &&
      fields.includes(field) &&
      field.getAttribute('aria-invalid') === 'true' &&
      !getMessage(field)
    ) {
      showError(field, undefined);
    }
  });
}
