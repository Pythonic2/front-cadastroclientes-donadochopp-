import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import logo2 from './assets/logo2.png';
import './App.css'
import { useEffect, useState } from 'react';

function App() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone_number: '',
    interesse: 'Chopp na Praia',
    detalhes: '',
    logo: null,
    trabalha: '',
    nome_empresa: ''
  });
  const [enviando, setEnviando] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const token = import.meta.env.VITE_API_TOKEN;
  useEffect(() => {
    fetch('http://192.168.4.74:8009/api/client/', {
      headers: {
        'Authorization': `Token 2684df84932ff4305e02a0e13f4656a258602122`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setClientes(data);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'logo') {
      setForm((prev) => ({ ...prev, logo: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);
    setMensagem('');
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('email', form.email);
    formData.append('phone_number', form.phone_number);
    formData.append('interesse', form.interesse);
    formData.append('detalhes', form.detalhes);
    formData.append('trabalha', form.trabalha);
    if (form.trabalha === 'Sim') {
      formData.append('nome_empresa', form.nome_empresa);
    }
    if (form.logo) formData.append('logo', form.logo);

    try {
      const res = await fetch('http://192.168.4.74:8009/api/client/', {
        method: 'POST',
        headers: {
          'Authorization': 'Token 2684df84932ff4305e02a0e13f4656a258602122'
        },
        body: formData
      });
      if (!res.ok) throw new Error('Erro ao enviar cadastro');
      setMensagem('Pré-cadastro enviado com sucesso!');
      setShowPopup(true);
      setForm({ name: '', email: '', phone_number: '', interesse: 'Chopp na Praia', detalhes: '', logo: null, trabalhaComChopp: '', nomeEmpresa: '' });
      const data = await res.json();
      setClientes((prev) => [...prev, data]);
    } catch (err) {
      setMensagem('Erro ao enviar pré-cadastro.');
      setShowPopup(false);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center  px-2 py-8 md:py-0"> {/* bg-[#fbf9f4] */}
      <div className="w-full max-w-xl mx-auto rounded-2xl shadow-soft border border-black/10 p-8 mt-8">
        <h1 className="font-display text-3xl md:text-4xl text-center mb-2 text-secondary">Pré-cadastro para Venda de Chopp</h1>
        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="text-sm font-medium">Nome</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} required className="mt-1.5 h-12 w-full rounded-xl border border-black/10 bg-white px-4 outline-none focus:border-primary" placeholder="Seu nome" />
          </div>
          <div>
            <label className="text-sm font-medium">Telefone / WhatsApp</label>
            <input type="tel" name="phone_number" value={form.phone_number} onChange={handleChange} required className="mt-1.5 h-12 w-full rounded-xl border border-black/10 bg-white px-4 outline-none focus:border-primary" placeholder="(00) 00000-0000" />
          </div>
          <div>
            <label className="text-sm font-medium">E-mail</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required className="mt-1.5 h-12 w-full rounded-xl border border-black/10 bg-white px-4 outline-none focus:border-primary" placeholder="Seu e-mail" />
          </div>
          <div>
            <label className="text-sm font-medium">Já trabalha com chopp?</label>
            <select
              name="trabalha"
              value={form.trabalha}
              onChange={handleChange}
              required
              className="mt-1.5 h-12 w-full rounded-xl border border-black/10 bg-white px-4 outline-none focus:border-primary"
            >
              <option value="">Selecione</option>
              <option value="Sim">Sim</option>
              <option value="Não">Não</option>
            </select>
          </div>
          {form.trabalha === 'Sim' && (
            <div>
              <label className="text-sm font-medium">Nome da empresa</label>
              <input
                type="text"
                name="nome_empresa"
                value={form.nome_empresa}
                onChange={handleChange}
                required
                className="mt-1.5 h-12 w-full rounded-xl border border-black/10 bg-white px-4 outline-none focus:border-primary"
                placeholder="Nome da empresa"
              />
            </div>
          )}
          <button type="submit" disabled={enviando} className="inline-flex w-full items-center justify-center rounded-full bg-secondary px-8 py-4 text-lg font-bold text-white shadow-soft transition hover:scale-[1.01] hover:bg-secondary/90">
            {enviando ? 'Enviando...' : 'Enviar Pré-cadastro'}
          </button>
          {/* Popup de sucesso */}
          {showPopup && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
              <div className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center max-w-xs w-full relative animate-fadeUp">
                <img src={logo2} alt="Logo Dona do Chopp" className="h-20 mb-4" />
                <h2 className="text-2xl font-display text-secondary mb-2 text-center">Cadastro enviado!</h2>
                <p className="text-center text-black/80 mb-4">Obrigado pelo pré-cadastro.<br />Em breve entraremos em contato 🍺</p>
                <button onClick={() => setShowPopup(false)} className="mt-2 px-6 py-2 rounded-full bg-primary text-white font-bold shadow hover:bg-primary/90 transition">Fechar</button>
              </div>
            </div>
          )}
          {/* Mensagem de erro */}
          {mensagem && !mensagem.includes('sucesso') && (
            <div className="text-center mt-2 text-red-600">{mensagem}</div>
          )}
        </form>
      </div>
      {/* <div className="w-full max-w-xl mx-auto mt-12">
        <h2 className="font-display text-2xl text-center mb-4 text-primary">Lista de Pré-cadastros</h2>
        {loading ? (
          <div className="text-center text-black/60">Carregando...</div>
        ) : (
          <ul className="space-y-3">
            {clientes.map((cliente) => (
              <li key={cliente.url || cliente.email} className="rounded-xl border border-black/10 bg-white p-4 shadow-soft flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <strong className="text-lg text-secondary">{cliente.name}</strong>
                  <div className="text-black/60 text-sm">{cliente.email} — {cliente.phone_number}</div>
                  {cliente.interesse && <div className="text-black/60 text-xs">Interesse: {cliente.interesse}</div>}
                  {cliente.detalhes && <div className="text-black/50 text-xs mt-1">{cliente.detalhes}</div>}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div> */}
    </div>
  );
}

export default App;
