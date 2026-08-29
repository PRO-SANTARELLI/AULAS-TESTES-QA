import pytest
from unittest.mock import MagicMock

from backend.main import create_task, TaskCreate

def test_create_task_rejeita_usuario_inexistente():

    db = MagicMock()

    # Simula usuário inexistente
    db.query.return_value.filter.return_value.first.return_value = None

    task = TaskCreate(
        title="Estudar QA",
        description="Estudar testes unitários",
        priority="HIGH"
    )

    with pytest.raises(Exception) as erro:
        create_task(
            user_id=999,
            task=task,
            db=db
        )

    assert erro.value.status_code == 404
    assert erro.value.detail == "Usuário não encontrado."


def test_create_task_rejeita_prioridade_invalida():
    db = MagicMock()

    # Simula a existência do usuário
    db.query.return_value.filter.return_value.first.return_value = MagicMock()

    task = TaskCreate(
        title="Estudar QA",
        description="Estudar testes unitários",
        priority="URGENTE"
    )

    with pytest.raises(Exception) as erro:
        create_task(
            user_id=1,
            task=task,
            db=db
        )

    assert erro.value.status_code == 400
    assert erro.value.detail == "Prioridade inválida. Use LOW, MEDIUM ou HIGH."