export function showToast(message: string) {
  const toast = document.querySelector('#toast');
  if (!(toast instanceof HTMLElement)) return;
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout((toast as HTMLElement & { _timer?: number })._timer);
  (toast as HTMLElement & { _timer?: number })._timer = window.setTimeout(() => {
    toast.classList.remove('show');
  }, 3400);
}

export function initCountdown(root: ParentNode = document) {
  const countdown = root.querySelector<HTMLElement>('[data-countdown]');
  if (!countdown) return;

  const iso = countdown.dataset.eventIso;
  if (!iso) return;

  const eventDate = new Date(iso);
  const dd = countdown.querySelector('[data-dd]');
  const hh = countdown.querySelector('[data-hh]');
  const mm = countdown.querySelector('[data-mm]');
  const ss = countdown.querySelector('[data-ss]');

  const pad = (n: number) => String(n).padStart(2, '0');

  const render = () => {
    const diff = eventDate.getTime() - Date.now();
    if (Number.isNaN(diff) || diff <= 0) {
      if (dd) dd.textContent = '00';
      if (hh) hh.textContent = '00';
      if (mm) mm.textContent = '00';
      if (ss) ss.textContent = '00';
      return;
    }
    const total = Math.floor(diff / 1000);
    if (dd) dd.textContent = pad(Math.floor(total / 86400));
    if (hh) hh.textContent = pad(Math.floor((total % 86400) / 3600));
    if (mm) mm.textContent = pad(Math.floor((total % 3600) / 60));
    if (ss) ss.textContent = pad(total % 60);
  };

  render();
  window.setInterval(render, 1000);
}

export function initScrollRegister(root: ParentNode = document) {
  root.querySelectorAll('.scroll-register').forEach((link) => {
    link.addEventListener('click', () => {
      window.setTimeout(() => {
        document.querySelector<HTMLInputElement>('#registro input[name="nombre"]')?.focus();
      }, 500);
    });
  });
}

export function initVideoPlaceholders(root: ParentNode = document, message: string) {
  root.querySelectorAll('[data-video-placeholder], [data-video]').forEach((button) => {
    button.addEventListener('click', () => showToast(message));
  });
}

export function initPendingLinks(root: ParentNode = document) {
  root.querySelectorAll<HTMLAnchorElement>('a[data-pending="true"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      showToast('Este enlace aún no está configurado.');
    });
  });
}

/**
 * Formularios:
 * - Sin MasterTools: valida y redirige a thankYouPath (flujo funnel local).
 * - Con MasterTools (data-mastertools="true"): valida y deja enviar el POST nativo
 *   al action configurado. Configura en MasterTools la URL de agradecimiento → /gracias/
 */
export function initForms(
  root: ParentNode = document,
  options: { thankYouPath: string } = { thankYouPath: '/gracias/' },
) {
  const { thankYouPath } = options;

  root.querySelectorAll<HTMLFormElement>('form[data-form]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      const required = [...form.querySelectorAll<HTMLInputElement>('[required]')];
      const invalid = required.find(
        (input) => !input.value.trim() || (input.type === 'email' && !input.validity.valid),
      );
      const status =
        form.querySelector('.form-status') || document.querySelector('.final-status');

      if (invalid) {
        event.preventDefault();
        invalid.focus();
        if (status) status.textContent = 'Completa tus datos para continuar.';
        return;
      }

      const usesMasterTools = form.dataset.mastertools === 'true';

      if (usesMasterTools) {
        if (status) status.textContent = 'Enviando tu registro…';
        // Permitir submit nativo hacia MasterTools
        return;
      }

      event.preventDefault();
      if (status) status.textContent = '¡Listo! Te llevamos a la confirmación…';
      window.setTimeout(() => {
        window.location.assign(thankYouPath);
      }, 350);
    });
  });
}
