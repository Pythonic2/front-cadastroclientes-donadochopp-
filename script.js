(function () {
  const trabalha = document.getElementById('trabalha');
  const instaWrap = document.getElementById('insta-wrap');
  const instaInput = document.getElementById('instagram');
  const form = document.getElementById('lead-form');
  const formContent = document.getElementById('form-content');
  const success = document.getElementById('success');

  trabalha.addEventListener('change', function () {
    if (trabalha.value === 'sim') {
      instaWrap.classList.remove('hidden');
      instaInput.setAttribute('required', 'required');
    } else {
      instaWrap.classList.add('hidden');
      instaInput.removeAttribute('required');
      instaInput.value = '';
    }
  });

  instaInput.addEventListener('input', function () {
    let v = instaInput.value.replace(/^@+/, '');
    instaInput.value = v ? '@' + v : '';
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const data = {
      nome: form.nome.value.trim(),
      telefone: form.telefone.value.trim(),
      email: form.email.value.trim(),
      trabalha: form.trabalha.value,
      instagram: form.instagram.value.trim(),
    };
    console.log('Lead:', data);
    // TODO: enviar para backend
    formContent.classList.add('hidden');
    success.classList.remove('hidden');
  });
})();
