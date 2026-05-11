
const scheduleData = {
    'Lunes': [
        { clase: 'Karate AM', horario: '10:00 - 11:00', nivel: 'Todos' },
        { clase: 'Pre-Karate', horario: '17:20 - 18:10', nivel: 'Todos' },
        { clase: 'Karate Infantil', horario: '18:15 – 19:10', nivel: 'Todos' },
        {clase:  'Karate Juvenil',  horario: '19:15 - 20:15', nivel: 'Todos'},
        {clase:  'Karate Adultos', horario: '20:20 - 21:15', nivel: 'Todos'}
    ],
    'Martes': [
        { clase: 'Karate Juvenil-Adultos', horario: '20:15 - 21:20', nivel: 'Juvenil y adultos' }
    ],
    'Miércoles': [
        { clase: 'Karate AM', horario: '10:00 - 11:00', nivel: 'Todos' },
        { clase: 'Pre-Karate', horario: '17:20 - 18:10', nivel: 'Todos' },
        { clase: 'Karate Infantil', horario: '18:15 – 19:10', nivel: 'Todos' },
        {clase:  'Karate Juvenil',  horario: '19:15 - 20:15', nivel: 'Todos'},
        {clase:  'Karate Adultos', horario: '20:20 - 21:15', nivel: 'Todos'}
    ],
    'Jueves': [
        { clase: 'Karate Juvenil-Adultos', horario: '20:15 - 21:20', nivel: 'Juvenil y adultos' }
    ],
    'Viernes': [
        { clase: 'Karate AM', horario: '10:00 - 11:00', nivel: 'Todos' },
        { clase: 'Pre-Karate', horario: '17:20 - 18:10', nivel: 'Todos' },
        { clase: 'Karate Infantil', horario: '18:15 – 19:10', nivel: 'Todos' },
        {clase:  'Karate Juvenil',  horario: '19:15 - 20:15', nivel: 'Todos'},
        {clase:  'Karate Adultos', horario: '20:20 - 21:15', nivel: 'Todos'}
    ],
};

function setDay(day) {
    // Actualizar botón activo
    document.querySelectorAll('.day-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('btn-' + day).classList.add('active');

    const rows = scheduleData[day] || [];
    const tbody = document.getElementById('schedule-body');
    const container = document.getElementById('schedule-container');
    const empty = document.getElementById('empty-msg');

    if (rows.length === 0) {
        container.style.display = 'none';
        empty.style.display = 'block';
    } else {
        container.style.display = 'block';
        empty.style.display = 'none';
        tbody.innerHTML = rows.map(r => `
        <tr>
          <td>${r.clase}</td>
          <td>${r.horario}</td>
          <td><span class="pill">${r.nivel}</span></td>
        </tr>
      `).join('');
    }
}

// Mostrar Lunes al cargar
setDay('Lunes');

/* Scroll reveal */
const ro = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
        if (e.isIntersecting) { setTimeout(() => e.target.classList.add('in'), i * 70); ro.unobserve(e.target); }
    });
}, { threshold: .1 });
document.querySelectorAll('.reveal').forEach(el => ro.observe(el));

/* Toast */
function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg; t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 4500);
}

/* Email — abre cliente de correo del usuario con mensaje pre-llenado */
function submitEmail() {
    const name = document.getElementById('fName').value.trim();
    const email = document.getElementById('fEmail').value.trim();
    const phone = document.getElementById('fPhone').value.trim();
    const subject = document.getElementById('fSubject').value;
    const msg = document.getElementById('fMsg').value.trim();
    if (!email) { alert('Por favor ingresa tu correo electrónico.'); return; }
    // ✏️ REEMPLAZA con el correo real del dojo
    const TO = 'contacto@dojofudoshin.cl';
    const SUBJ = subject ? `[Dojo Fudoshin] ${subject}` : '[Dojo Fudoshin] Consulta desde la web';
    const BODY =
        `Hola equipo Fudoshin,

Nombre  : ${name || '—'}
Correo  : ${email}
Teléfono: ${phone || '—'}
Consulta: ${subject || '—'}

Mensaje:
${msg || '—'}

---
Enviado desde el sitio web del Dojo Fudoshin Karate.`;
    window.location.href = `mailto:${TO}?subject=${encodeURIComponent(SUBJ)}&body=${encodeURIComponent(BODY)}`;
    showToast('✅ Abriendo tu correo… ¡Te responderemos pronto con toda la info!');
}

/* WhatsApp — abre chat con mensaje pre-llenado */
function submitWA() {
    const name = document.getElementById('fName').value.trim();
    const subject = document.getElementById('fSubject').value;
    const msg = document.getElementById('fMsg').value.trim();
    let text = `Hola! Vi la página del Dojo Fudoshin Karate 🥋`;
    if (name) text += `\nMi nombre es ${name}.`;
    if (subject) text += `\nConsulta sobre: *${subject}*.`;
    if (msg) text += `\n\n${msg}`;
    text += `\n\n¿Podrían darme más información?`;
    // ✏️ REEMPLAZA 56912345678 con tu número real
    window.open(`https://wa.me/56912345678?text=${encodeURIComponent(text)}`, '_blank');
    showToast('💬 Abriendo WhatsApp…');
}
