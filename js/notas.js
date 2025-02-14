const apiUrl = 'http://localhost:3000/notas';

function displayNota(nota) {
  const notaList = document.getElementById('notaList');
  notaList.innerHTML = '';
  nota.forEach(nota => {
    const notaElement = document.createElement('tr');
    notaElement.innerHTML = `
              <td>${nota.id_notas}</td>
              <td>${nota.id_aluno}</td>
              <td>${nota.id_disciplina}</td>
              <td>${nota.n1}</td>
              <td>${nota.AI}</td>
              <td>${nota.AP}</td>
              <td>${nota.faltas}</td>
              <td>${nota.periodo_letivo}</td>
              <td>
                <button onclick="updateNota(${nota.id_notas})">Editar</button>
                <button onclick="deleteNota(${nota.id_notas})">Excluir</button>
              </td>
          `;
    notaList.appendChild(notaElement);
  });
}

function getNotas() {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => displayNota(data))
    .catch(error => console.error('Erro:', error));
}

document.getElementById('addNotaForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const alunoId = document.getElementById('notaAlunoId').value;
  const disciplinaId = document.getElementById('notaDisciplinaId').value;
  const n1 = document.getElementById('notaN1').value;
  const AI = document.getElementById('notaAI').value;
  const AP = document.getElementById('notaAP').value;
  const faltas = document.getElementById('notaFaltas').value;
  const periodoLetivo = document.getElementById('notaPeriodoLetivo').value;

  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id_aluno: alunoId,
      id_disciplina: disciplinaId,
      n1: n1,
      AI: AI,
      AP: AP,
      faltas: faltas,
      periodo_letivo: periodoLetivo
    })
  })
    .then(response => response.json())
    .then(data => {
      getNotas();
      document.getElementById('addNotaForm').reset();
    })
    .catch(error => console.error('Erro:', error));
});

function updateNota(id) {
  fetch(`${apiUrl}/${id}`)
    .then(response => response.json())
    .then(data => {
      document.getElementById('editNotaId').value = data.id_notas;
      document.getElementById('editNotaAlunoId').value = data.id_aluno;
      document.getElementById('editNotaDisciplinaId').value = data.id_disciplina;
      document.getElementById('editNotaN1').value = data.n1;
      document.getElementById('editNotaAI').value = data.AI;
      document.getElementById('editNotaAP').value = data.AP;
      document.getElementById('editNotaFaltas').value = data.faltas;
      document.getElementById('editNotaPeriodoLetivo').value = data.periodo_letivo;
    })
    .catch(error => console.error('Erro:', error));
}

document.getElementById('updateNotaForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const notaId = document.getElementById('editNotaId').value;
  const alunoId = document.getElementById('editNotaAlunoId').value;
  const disciplinaId = document.getElementById('editNotaDisciplinaId').value;
  const n1 = document.getElementById('editNotaN1').value;
  const AI = document.getElementById('editNotaAI').value;
  const AP = document.getElementById('editNotaAP').value;
  const faltas = document.getElementById('editNotaFaltas').value;
  const periodoLetivo = document.getElementById('editNotaPeriodoLetivo').value;

  fetch(`${apiUrl}/${notaId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id_aluno: alunoId,
      id_disciplina: disciplinaId,
      n1: n1,
      AI: AI,
      AP: AP,
      faltas: faltas,
      periodo_letivo: periodoLetivo
    })
  })
    .then(response => response.json())
    .then(data => {
      getNotas();
      document.getElementById('editNotaForm').style.display = 'none';
    })
    .catch(error => console.error('Erro:', error));
});

function deleteNota(id) {
  fetch(`${apiUrl}/${id}`, {
    method: 'DELETE'
  })
    .then(response => response.json())
    .then(data => getNotas())
    .catch(error => console.error('Erro:', error));
}

getNotas();

function cancelEdit() {
  document.getElementById('updateNotaForm').reset();
}
