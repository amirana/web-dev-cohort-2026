const textInput = document.getElementById('input-text');
const addBtn = document.getElementById('add-btn');
const list = document.getElementById('list');

textInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addBtn.click();
});

addBtn.addEventListener('click', () => {

    if (textInput.value.trim() === '') {
        alert('Why in so hurry? Please enter the value');
        return;
    }

    const li = document.createElement('li');
    const span = document.createElement('span');
    const delBtn = document.createElement('button');

    span.textContent = textInput.value.trim();
    span.title = 'Double-click to edit'
    delBtn.textContent = 'Delete';

    li.appendChild(span);
    li.appendChild(delBtn);
    list.appendChild(li);


    span.addEventListener('dblclick', () => {
        let isEditingDone = false;

        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.value = span.textContent;

        li.replaceChild(editInput, span);
        editInput.focus();

        editInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                if (editInput.value.trim() === '') {
                    editInput.value = span.textContent;
                    li.replaceChild(span, editInput);
                    return;
                }
                isEditingDone = true;
                span.textContent = editInput.value;
                li.replaceChild(span, editInput);
            }

            if (e.key === 'Escape') {
                isEditingDone = true;
                editInput.value = span.textContent;
                li.replaceChild(span, editInput);
            }
        });

        editInput.addEventListener('blur', () => {
            if (isEditingDone) return;

            isEditingDone = true;
            span.textContent = editInput.value;
            li.replaceChild(span, editInput);
            
        });
    });

    delBtn.addEventListener('click', (e) => {
        if (confirm('Do you want to delete this item?')) {
            e.target.closest('li').remove();
        }
    });


    textInput.value = '';
})