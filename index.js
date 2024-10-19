
let buttons = [
    {
        "id": 1,
        "displayName": "Привітання",
        "data":
        [
            {"Ім'я": 0},
            {"Вік": "asd"},
            {"Олюблене заняття": ""}
        ],
        text(data) {return`Привіт, мене звати ${data[0]}, мені ${data[1]} років. Я люблю ${data[2]}. `}
    },
    {
        "id": 2,
        "displayName": "Погода",
        "data":
        [
            {"Температура": 0},
            {"Пора року": ""},
        ],
        text(data) {return`На дворі зараз ${data[0]}, температура приблизно ${data[1]}. `}
    }
];

let formIsOpen = false;
let currentButtonId = 0;

let finalText = "";

let leftContainer = document.getElementById("containerLeft");
let rightContainre = document.getElementById("containerRight");

let textContainer = document.getElementById("textContainer");
let generateButton = document.getElementById("generateDocx");

let form = document.getElementById("modal");
let formContent = document.getElementById("modalContent");
let submitButton = document.getElementById("okButton");

form.style.visibility = "hidden"

for (let i = 0; i < buttons.length; i++)
{
    const button = document.createElement("button");
    button.innerText = buttons[i].displayName;
    button.classList.add("btn");

    leftContainer.appendChild(button);
    
    button.addEventListener("click", function() {
        currentButtonId = buttons[i].id

        formIsOpen = !formIsOpen;

        if (formIsOpen)
        {
            for (let n = 0; n < buttons[i].data.length; n++)
            {
                formContent.appendChild(createModalForm(Object.keys(buttons[i].data[n])[0]));
            }
        }
        else
        {
            formContent.innerHTML = '';
        }

        form.style.visibility = formIsOpen ? "visible" : "hidden";

    });
}

function createModalForm(data)
{
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = data
    input.classList.add = 'inputValue';

    return input
}

submitButton.addEventListener("click", function() {
    const inputs = formContent.querySelectorAll("input");
    
    let formData = [];
    
    inputs.forEach(input => {
        formData.push(input.value);
    });

    let button = buttons.find(item => item.id === currentButtonId);

    finalText += button.text(formData)

    console.log(finalText)

    formContent.innerHTML = '';
    formIsOpen = !formIsOpen;
    form.style.visibility = "hidden"

    textContainer.textContent = finalText;
  });

generateButton.addEventListener('click', function() {
    const doc = new docx.Document(
    {
        sections:
        [
            {
                properties: {},
                children:
                [
                    new docx.Paragraph(
                    {
                        children:
                        [
                            new docx.TextRun(finalText),
                        ],
                    }),
                ],
            }
        ]
    });

    docx.Packer.toBlob(doc).then(blob => {
        console.log(blob);
        saveAs(blob, "generated.docx");
    });
});
