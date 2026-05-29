// ====== CONSTANTES DE RAÇAS PORTUGUESAS EXPANDIDAS ======
const RACAS = {
    "Cão": [
        "Labrador Retriever", "Pastor Alemão", "Golden Retriever", "Bulldog Francês", 
        "Beagle", "Poodle", "Cão de Serra da Estrela", "Cão de Água Português",
        "Podengo Português", "Rottweiler", "Boxer", "Border Collie", "Pastor Belga",
        "Yorkshire Terrier", "Chihuahua", "Cocker Spaniel", "Dobermann",
        "Serrano de Aires", "Perdigueiro Português", "Cão de Castro Laboreiro",
        "Rafeiro Alentejano", "S.R.D. (Sem Raça Definida)", "Outra"
    ],
    "Gato": ["Europeu Comum", "Persa", "Siamês", "Maine Coon", "Bengala", "Ragdoll", "Angorá Português", "Outra"],
    "Outro": ["Coelho Anão", "Porquinho da Índia", "Hamster", "Porco Doméstico", "Chinchila", "Outro"]
};

// ====== LINKS DE FOTOS DE ACORDO COM A RAÇA EXATA DO FIGMA ======
const FOTOS_ANIMAIS = {
    "Labrador Retriever": "https://images.unsplash.com/photo-1552053831-71594a27632d?w=300", // Foto do Bobby
    "Europeu Comum": "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300",      // Foto da Mia
    "Cão de Serra da Estrela": "https://images.unsplash.com/photo-1600858855938-1647e3a9cfa0?w=300", 
    "Pastor Alemão": "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=300",
    "Cão de Água Português": "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?w=300",
    "Gato_Default": "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=300", 
    "Outro_Default": "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=300" 
};

// ====== SIAC SIMULADA ======
const SIAC = {
    "900123": { nome: "Bobby",  especie: "Cão",  raca: "Labrador Retriever", nifTutor: "234567890" },
    "900456": { nome: "Mia",     especie: "Gato", raca: "Europeu Comum",      nifTutor: "123456789" }
};

// Historial preenchido com nomes PT-PT e metadados estruturados
const dadosIniciais = {
    "900123": {
        chip: "900123", nome: "Bobby", especie: "Cão", raca: "Labrador Retriever", nif: "234567890",
        peso: 25.4, photoUrl: FOTOS_ANIMAIS["Labrador Retriever"],
        restricoes: "Alergia severa a frango e picadas de pulga. Intolerância a anti-inflamatórios não esteroides (AINEs).",
        historico: [
            { id: 1, data: "2026-05-15", vet: "Dra. Cristina Soares",  clinica: "Hospital Vet de Braga",      tipo: "Consulta",  detalhes: "Consulta de rotina semestral. Pavilhões auriculares limpos, mucosas rosadas e tempo de preenchimento capilar normal (<2s). Peso corporal estável sem alterações patológicas detetáveis." },
            { id: 2, data: "2026-04-10", vet: "Dr. Tiago Mendes",      clinica: "Clínica Veterinária do Minho", tipo: "Vacinação", detalhes: "Vacina polivalente canina contra esgana, parvovirose e leptospirose administrada (Lote LP4412). Próximo reforço profilático agendado para daqui a 12 meses." },
            { id: 3, data: "2026-02-18", vet: "Dra. Mariana Silva",    clinica: "Hospital Vet de Braga",      tipo: "Exame",     detalhes: "Painel bioquímico renal/hepático completo e hemograma completo. Valores de controlo dentro dos parâmetros normais da espécie canina." },
            { id: 4, data: "2025-11-05", vet: "Dr. Ricardo Pereira",   clinica: "Clínica Vet S. João",        tipo: "Cirurgia",  detalhes: "Procedimento cirúrgico efetuado: Resseção artroplástica da cabeça femoral esquerda devido a quadro de displasia coxofemoral. Cuidados pós-operatórios mantidos." }
        ]
    },
    "900456": {
        chip: "900456", nome: "Mia", especie: "Gato", raca: "Europeu Comum", nif: "123456789",
        peso: 4.2, photoUrl: FOTOS_ANIMAIS["Europeu Comum"],
        restricoes: "Nenhuma restrição biológica identificada.",
        historico: [
            { id: 5, data: "2026-05-10", vet: "Dra. Cristina Soares", clinica: "Hospital Vet de Braga", tipo: "Consulta", detalhes: "Check-up de rotina felino. Aplicação de desparasitante interno Broadline. Excelente peso e tónus muscular." }
        ]
    }
};

// ====== ATUALIZAÇÃO DA BASE DE DADOS (V5 - COMPATÍVEL COM FILTROS AVANÇADOS) ======
const DB_VERSION = "v5";
if (localStorage.getItem("sav_db_version") !== DB_VERSION) {
    localStorage.setItem("sav_animais", JSON.stringify(dadosIniciais));
    localStorage.setItem("sav_db_version", DB_VERSION);
}

let currentAnimal = null;
let currentAtoType = "Consulta";

// ====== MÓDULO AUXILIAR BASE DE DADOS ======
function getDB() {
    try { return JSON.parse(localStorage.getItem("sav_animais")) || {}; }
    catch { return {}; }
}
function saveDB(db) {
    localStorage.setItem("sav_animais", JSON.stringify(db));
}

function showToast(msg, type = "success") {
    const t = document.getElementById("toast");
    if (!t) return;
    t.className = `toast toast-${type}`;
    t.innerHTML = `<i class="fa-solid ${type === "success" ? "fa-circle-check" : type === "error" ? "fa-circle-xmark" : "fa-circle-info"}"></i> ${msg}`;
    t.classList.remove("hidden");
    clearTimeout(t._timer);
    t._timer = setTimeout(() => t.classList.add("hidden"), 3800);
}

function showSubScreen(id) {
    ["screen-dashboard", "screen-clinical-file", "screen-agenda"].forEach(s => {
        const el = document.getElementById(s);
        if (el) el.classList.add("hidden");
    });
    document.getElementById(id).classList.remove("hidden");
}

function setNavActive(menuId) {
    document.querySelectorAll(".nav-item").forEach(i => i.classList.remove("active"));
    const el = document.getElementById(menuId);
    if (el) el.classList.add("active");
}

function today() { return new Date().toISOString().split("T")[0]; }

function updateHeaderDate() {
    const el = document.getElementById("header-date");
    if (!el) return;
    const now = new Date();
    const opts = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    el.innerHTML = now.toLocaleDateString("pt-PT", opts);
}

// ====== POPULAR RAÇAS DINAMICAMENTE ======
function populateRacas(especieVal, selectId = "reg-raca") {
    const sel = document.getElementById(selectId);
    if (!sel) return;
    sel.innerHTML = "";
    const opt0 = document.createElement("option");
    opt0.value = ""; opt0.textContent = "— Selecione a raça —"; opt0.disabled = true; opt0.selected = true;
    sel.appendChild(opt0);
    (RACAS[especieVal] || []).forEach(r => {
        const opt = document.createElement("option");
        opt.value = r; opt.textContent = r;
        sel.appendChild(opt);
    });
}

const regEspEl = document.getElementById("reg-especie");
if(regEspEl) {
    regEspEl.addEventListener("change", function() {
        populateRacas(this.value);
    });
}
populateRacas("Cão");

// ====== LÓGICA DE LOGIN ======
document.getElementById("btn-choose-vet").addEventListener("click", function() {
    document.getElementById("profile-selection").classList.add("hidden");
    const lf = document.getElementById("login-form");
    lf.classList.remove("hidden");
    document.getElementById("selected-role-badge").innerHTML = '<i class="fa-solid fa-user-doctor"></i> Médico Veterinário';
    document.getElementById("login-user").focus();
});

document.getElementById("btn-choose-admin").addEventListener("click", function() {
    showToast("O módulo administrativo está previsto numa iteração futura. Por favor, aceda como Médico Veterinário.", "info");
});

document.getElementById("btn-back-profiles").addEventListener("click", function() {
    document.getElementById("login-form").classList.add("hidden");
    document.getElementById("profile-selection").classList.remove("hidden");
    document.getElementById("login-error").classList.add("hidden");
});

document.getElementById("btn-submit-login").addEventListener("click", doLogin);

function doLogin() {
    const user = document.getElementById("login-user").value.trim().toLowerCase();
    const errEl = document.getElementById("login-error");

    if (!user) {
        errEl.textContent = "Por favor, introduza o nome de utilizador.";
        errEl.classList.remove("hidden"); return;
    }
    if (user !== "cristina") {
        errEl.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> Utilizador não reconhecido. Use <strong>cristina</strong>.';
        errEl.classList.remove("hidden"); return;
    }

    errEl.classList.add("hidden");
    document.getElementById("screen-login").classList.add("hidden");
    document.getElementById("main-layout").classList.remove("hidden");
    updateHeaderDate();
    showSubScreen("screen-dashboard");
    showToast("Bem-vinda, Dra. Cristina Soares!", "success");
}

document.getElementById("btn-logout").addEventListener("click", function() {
    document.getElementById("login-user").value = "";
    document.getElementById("login-pass").value = "";
    document.getElementById("login-form").classList.add("hidden");
    document.getElementById("profile-selection").classList.remove("hidden");
    document.getElementById("main-layout").classList.add("hidden");
    document.getElementById("screen-login").classList.remove("hidden");
    currentAnimal = null;
});

// ====== LINKS SIDEBAR ======
document.querySelectorAll(".nav-item").forEach(function(item) {
    item.addEventListener("click", function() {
        setNavActive(this.id);
        if (this.id === "menu-portal") {
            showSubScreen("screen-dashboard");
        } else if (this.id === "menu-agenda") {
            showSubScreen("screen-agenda"); 
        } else {
            const name = this.textContent.trim();
            showToast(`A secção "${name}" será implementada numa iteração futura (Épicos secundários).`, "info");
        }
    });
});

function clickAgenda(compromisso) {
    alert(`Módulo de Agendamentos (Épico 5):\nO bloco "${compromisso}" está devidamente alocado em base de dados clínica. Os detalhes deste tutor/paciente estão descritos nos contratos do sistema de marcações.`);
}

// ====== MICROCHIP — VALIDAÇÃO ======
document.getElementById("btn-read-chip").addEventListener("click", function() {
    document.getElementById("input-microchip").value = "900123";
    showToast("Leitor simulado: microchip 900123 detetado.", "info");
});

document.getElementById("btn-validate-sav").addEventListener("click", function() {
    const chip = document.getElementById("input-microchip").value.trim();
    const errEl = document.getElementById("siac-error");
    const actionsEl = document.getElementById("siac-actions");

    errEl.classList.add("hidden"); actionsEl.classList.add("hidden");

    if (!chip) {
        errEl.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> Insira um número de microchip.';
        errEl.classList.remove("hidden"); return;
    }

    if (chip === "999") {
        actionsEl.classList.remove("hidden"); return;
    }

    const db = getDB();
    if (db[chip] || SIAC[chip]) {
        loadAnimalFile(chip, false);
    } else {
        errEl.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Microchip não encontrado na SIAC. Registe primeiro o animal.';
        errEl.classList.remove("hidden");
    }
});

document.getElementById("btn-retry-siac").addEventListener("click", function() {
    document.getElementById("siac-actions").classList.add("hidden");
    loadAnimalFile("900123", false);
});

document.getElementById("btn-local-records").addEventListener("click", function() {
    document.getElementById("siac-actions").classList.add("hidden");
    loadAnimalFile("900123", true);
});

// ====== CARREGAR FICHA COM FOTO ======
function loadAnimalFile(chip, isLocalMode) {
    const db = getDB();
    const siacData = SIAC[chip];
    const stored = db[chip];

    let animal;
    if (stored) {
        animal = stored;
    } else if (siacData) {
        // Atribui dinamicamente a foto correspondente à raça
        let fotoPorRaca = FOTOS_ANIMAIS[siacData.raca] || FOTOS_ANIMAIS.outro_default;
        if (!FOTOS_ANIMAIS[siacData.raca]) {
            if (siacData.especie === "Cão") fotoPorRaca = FOTOS_ANIMAIS.cao_default;
            if (siacData.especie === "Gato") fotoPorRaca = FOTOS_ANIMAIS.gato_default;
        }

        animal = {
            chip, nome: siacData.nome, especie: siacData.especie,
            raca: siacData.raca, nif: siacData.nifTutor,
            peso: 0, photoUrl: fotoPorRaca, historico: []
        };
    }

    currentAnimal = animal;
    showSubScreen("screen-clinical-file");

    document.getElementById("txt-animal-name").textContent = `${animal.nome} (${animal.especie})`;
    document.getElementById("lbl-nome-title").textContent = animal.nome;
    document.getElementById("lbl-chip").textContent = animal.chip;
    document.getElementById("lbl-nif").textContent = animal.nif;
    document.getElementById("lbl-especie-raca").textContent = `${animal.especie} / ${animal.raca}`;
    document.getElementById("input-peso").value = animal.peso || "";
    document.getElementById("input-restricoes").value = animal.restricoes || "";

    const imgEl = document.getElementById("animal-photo");
    if (imgEl) {
        imgEl.src = animal.photoUrl || FOTOS_ANIMAIS.cao_default;
    }

    const localAlert = document.getElementById("local-alert");
    isLocalMode ? localAlert.classList.remove("hidden") : localAlert.classList.add('hidden');

    document.getElementById("ato-form-wrapper").classList.add("hidden");
    document.getElementById("btn-init-ato").classList.remove("hidden");
    renderTimeline(animal.historico);
}

// ====== REGRA DE NEGÓCIO DO FILTRO AVANÇADO (CASTRAÇÃO VS CIRURGIA) ======
function renderTimeline(historico, filter = "") {
    const list = document.getElementById("timeline");
    list.innerHTML = "";

    const hSeguro = historico || [];
    const fl = filter.toLowerCase().trim();
    
    const filtrado = hSeguro.filter(i => {
        if (!fl) return true;
        // EXIGÊNCIA DO VET: Se pesquisar o detalhe clínico específico ("castração"), NÃO deve aparecer
        if (fl === "castração" || fl === "castracao") {
            return false;
        }
        // Deve aparecer estritamente ao filtrar pela macrocategoria ("Cirurgia", "Vacinação", etc.)
        return (i.tipo || "").toLowerCase().includes(fl);
    });

    if (filtrado.length === 0) {
        list.innerHTML = "<p style='color:var(--text-muted);padding:16px 0;'><i class='fa-solid fa-circle-info'></i> Nenhum evento registado para esta categoria de filtro.</p>";
        return;
    }

    filtrado.forEach(function(item, index) {
        const li = document.createElement("li");
        li.className = "timeline-item animate-fade";
        li.setAttribute("data-tipo", item.tipo || "");
        // Guarda o índice do elemento para podermos carregar no modal pop-up
        li.setAttribute("onclick", `openReportModal(${item.id || index})`);
        
        li.innerHTML = `
            <div class="timeline-meta">
                <span class="meta-tipo tipo-${item.tipo || 'Consulta'}">${item.tipo || '—'}</span>
                <span class="meta-date"><i class="fa-solid fa-calendar-day"></i> ${item.data || '—'}</span>
                <span class="meta-vet"><i class="fa-solid fa-user-doctor"></i> ${item.vet || 'Dra. Cristina Soares'} · ${item.clinica || 'Hospital Vet de Braga'}</span>
            </div>
            <p class="timeline-body">${item.detalhes ? item.detalhes.substring(0, 120) + '...' : ''} <strong style="color:var(--blue); font-size:0.82rem; text-decoration:underline;">Ver Relatório Completo</strong></p>
        `;
        list.appendChild(li);
    });
}

// ====== LÓGICA DE ABERTURA DO MODAL / POP-UP CLINICO CLICÁVEL ======
window.openReportModal = function(atoId) {
    if (!currentAnimal || !currentAnimal.historico) return;
    
    // Procura o ato clínico no histórico do animal pelo ID ou índice
    const ato = currentAnimal.historico.find(a => a.id === atoId) || currentAnimal.historico[0];
    if (!ato) return;

    document.getElementById("modal-title-type").innerHTML = `<i class="fa-solid fa-file-waveform"></i> Relatório Clínico Completo — ${ato.tipo}`;
    document.getElementById("modal-date").textContent = ato.data;
    document.getElementById("modal-vet").textContent = ato.vet || "Dra. Cristina Soares";
    document.getElementById("modal-clinica").textContent = ato.clinica || "Hospital Vet de Braga";
    document.getElementById("modal-detalhes").textContent = ato.detalhes;

    document.getElementById("report-modal").classList.remove("hidden");
};

// Fecho do Modal Pop-up
function closeModal() {
    document.getElementById("report-modal").classList.add("hidden");
}
document.getElementById("btn-close-modal").addEventListener("click", closeModal);
document.getElementById("btn-hide-modal").addEventListener("click", closeModal);

document.getElementById("input-filter").addEventListener("input", function() {
    if (currentAnimal) renderTimeline(currentAnimal.historico, this.value);
});

document.getElementById("btn-save-info").addEventListener("click", function() {
    if (!currentAnimal) return;
    const pesoVal = parseFloat(document.getElementById("input-peso").value);
    if (isNaN(pesoVal) || pesoVal < 0) { showToast("Introduza um peso válido.", "error"); return; }
    
    currentAnimal.peso = pesoVal;
    currentAnimal.restricoes = document.getElementById("input-restricoes").value.trim();

    const db = getDB();
    db[currentAnimal.chip] = currentAnimal;
    saveDB(db);
    showToast("Informação clínica guardada e sincronizada com sucesso.", "success");
});

document.getElementById("btn-simulate-lock").addEventListener("click", function() {
    showToast("Bloqueio de concorrência ativo.", "error");
});

document.getElementById("btn-back-dash").addEventListener("click", function() {
    showSubScreen("screen-dashboard");
});

// ====== NOVO ATO CLÍNICO ======
document.getElementById("btn-init-ato").addEventListener("click", function() {
    this.classList.add("hidden");
    document.getElementById("ato-form-wrapper").classList.remove("hidden");
    updateFormFields();
});

document.getElementById("btn-cancel-ato").addEventListener("click", function() {
    document.getElementById("ato-form-wrapper").classList.add("hidden");
    document.getElementById("btn-init-ato").classList.remove("hidden");
});

document.querySelectorAll(".tab").forEach(function(tab) {
    tab.addEventListener("click", function() {
        document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
        this.classList.add("active");
        currentAtoType = this.getAttribute("data-type");
        updateFormFields();
    });
});

function updateFormFields() {
    const f = document.getElementById("dynamic-fields");
    if (currentAtoType === "Consulta") {
        f.innerHTML = `<div class="field-group"><label>Dados clínicos da consulta</label><textarea id="ato-obs" rows="7" placeholder="Descreva os sintomas, anamnese e diagnóstico clínico completo…"></textarea></div>`;
    } else if (currentAtoType === "Vacinação") {
        f.innerHTML = `<div class="field-group"><label>Vacina administrada</label><input type="text" id="ato-vacina" placeholder="ex: Nobivac L4 / Eurican DHP"><label class="mt-1">Reforço Preventivo Obrigatório (meses)</label><input type="number" id="ato-proxima" value="12"></div>`;
    } else if (currentAtoType === "Exame") {
        f.innerHTML = `<div class="field-group"><label>Exame / Painel Realizado</label><input type="text" id="ato-exame" placeholder="ex: Hemograma Completo"><label class="mt-1">Observações e Conclusões Técnicas</label><textarea id="ato-obs" rows="5" placeholder="Insira o resumo das análises..."></textarea></div>`;
    } else if (currentAtoType === "Cirurgia") {
        f.innerHTML = `<div class="field-group"><label>Procedimento Cirúrgico Efetuado</label><input type="text" id="ato-cirurgia" placeholder="ex: Castração / Ovariohisterectomia"><label class="mt-1">Tratamento Efetuado na Altura & Cuidados Pós-Operatórios</label><textarea id="ato-obs" rows="5" placeholder="Lamber feridas, medicação pós-operatória..."></textarea></div>`;
    }
}

document.getElementById("btn-save-ato").addEventListener("click", function() {
    if (!currentAnimal) return;
    let detalhes = "";

    if (currentAtoType === "Consulta") detalhes = document.getElementById("ato-obs")?.value.trim();
    else if (currentAtoType === "Vacinação") {
        const vac = document.getElementById("ato-vacina")?.value.trim();
        const pr = document.getElementById("ato-proxima")?.value || "12";
        detalhes = `Administração da vacina profilática contra agentes patogénicos virais: ${vac}. Sincronizado plano profilático geral da clínica. Próxima toma em ${pr} meses.`;
    } else if (currentAtoType === "Exame") {
        const ex = document.getElementById("ato-exame")?.value.trim();
        const obs = document.getElementById("ato-obs")?.value.trim();
        detalhes = `Exame: ${ex}. Resumo das observações analíticas: ${obs}`;
    } else if (currentAtoType === "Cirurgia") {
        const cir = document.getElementById("ato-cirurgia")?.value.trim();
        const obs = document.getElementById("ato-obs")?.value.trim();
        detalhes = `Procedimento Cirúrgico: ${cir}. Notas de Bloco e Tratamento na Altura: ${obs}`;
    }

    if (!detalhes) { showToast("Preencha os dados informativos do ato.", "error"); return; }

    const novoId = Date.now(); // Gera um ID único em milissegundos para o modal clicar
    currentAnimal.historico.unshift({
        id: novoId, data: today(), vet: "Dra. Cristina Soares", clinica: "Hospital Vet de Braga",
        tipo: currentAtoType, detalhes: detalhes
    });

    const db = getDB();
    db[currentAnimal.chip] = currentAnimal;
    saveDB(db);

    showToast("Ato clínico guardado e sincronizado.", "success");
    loadAnimalFile(currentAnimal.chip, false);
});

// ====== REGISTAR NOVO ANIMAL ======
document.getElementById("btn-show-register-animal").addEventListener("click", function() {
    const form = document.getElementById("form-register-animal");
    const isHidden = form.classList.contains("hidden");
    form.classList.toggle("hidden", !isHidden);
});

document.getElementById("btn-submit-animal").addEventListener("click", function() {
    const chip  = document.getElementById("reg-chip").value.trim();
    const nif   = document.getElementById("reg-nif").value.trim();
    const nome  = document.getElementById("reg-nome").value.trim();
    const esp   = document.getElementById("reg-especie").value;
    const raca  = document.getElementById("reg-raca").value;

    if (!chip || !nif || !nome || !raca) { alert("Preencha todos os campos."); return; }

    const loadBox = document.getElementById("siac-loading-box");
    loadBox.classList.remove("hidden");

    setTimeout(function() {
        // Atribuição de fotos reais baseadas nas raças portuguesas que adicionámos
        let fotoAtribuida = FOTOS_ANIMAIS[raca] || FOTOS_ANIMAIS.outro_default;
        if (!FOTOS_ANIMAIS[raca]) {
            if (esp === "Cão") fotoAtribuida = FOTOS_ANIMAIS.cao_default;
            if (esp === "Gato") fotoAtribuida = FOTOS_ANIMAIS.gato_default;
        }

        SIAC[chip] = { nome, especie: esp, raca, nifTutor: nif };
        
        const db = getDB();
        db[chip] = {
            chip, nome, especie: esp, raca, nif, peso: 0, photoUrl: fotoAtribuida, restricoes: "",
            historico: [{ id: Date.now(), data: today(), vet: "Dra. Cristina Soares", clinica: "Hospital Vet de Braga", tipo: "Consulta", detalhes: `Abertura de ficha clínica — registo inicial na Rede SAV concluída de forma assíncrona.` }]
        };
        saveDB(db);

        loadBox.classList.add("hidden");
        showToast("Paciente registado com sucesso na SIAC e no SAV!", "success");
        document.getElementById("form-register-animal").classList.add("hidden");
        
        loadAnimalFile(chip, false);
    }, 1800);
});