jQuery.extend(jQuery.validator.messages, {
    required: "Това поле е задължително.",
    email: "Моля въведете валиден имейл адрес.",
    url: "Моля въведете валиден URL.",
    date: "Моля въведете валидна дата.",
    number: "Моля въведете валидно число.",
    digits: "Моля въведете само цифри.",
    equalTo: "Моля въведете същата стойност отново.",
    maxlength: jQuery.validator.format("Моля въведете не повече от {0} символа."),
    minlength: jQuery.validator.format("Моля въведете най-малко {0} символа."),
    rangelength: jQuery.validator.format("Моля въведете стойност, която е дълга между {0} и {1} символа."),
    range: jQuery.validator.format("Моля въведете стойност между {0} и {1}."),
    max: jQuery.validator.format("Моля въведете стойност по-малка или равна на {0}."),
    min: jQuery.validator.format("Моля въведете стойност по-голяма или равна на {0}.")
});