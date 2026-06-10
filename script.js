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

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const nome = form.nome.value.trim();
    const telefone = form.telefone.value.trim();
    const email = form.email.value.trim();
    const trabalhaVal = form.trabalha.value;
    const nome_empresa = form.instagram.value.trim();

    const formData = new FormData();
    formData.append('name', nome);
    formData.append('email', email);
    formData.append('phone_number', telefone);
    formData.append('interesse', 'Chopp na Praia');
    formData.append('detalhes', '');
    formData.append('trabalha', trabalhaVal === 'sim' ? 'Sim' : 'Não');
    if (trabalhaVal === 'sim') {
      formData.append('nome_empresa', nome_empresa);
    }

    try {
      const res = await fetch('http://192.168.4.74:8009/api/client/', {
        method: 'POST',
        headers: {
          'Authorization': 'Token 2684df84932ff4305e02a0e13f4656a258602122'
        },
        body: formData
      });
      if (!res.ok) throw new Error('Erro ao enviar cadastro');
      formContent.classList.add('hidden');
      success.classList.remove('hidden');
      form.reset();
      instaWrap.classList.add('hidden');
    } catch (err) {
      alert('Erro ao enviar pré-cadastro. Tente novamente.');
    }
  });
})();
