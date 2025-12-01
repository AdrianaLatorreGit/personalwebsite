$(function () {
    'use strict';

    // Custom Cursor
    const $cursor = $('#cursor');
    $(document).on('mousemove', function (e) {
        if ($(window).width() > 768) {
            $cursor.css({ left: e.clientX, top: e.clientY });
        }
    });

    $('a, button, input, textarea, .project-card, .logo')
        .on('mouseenter', function () {
            $cursor.addClass('active');
        })
        .on('mouseleave', function () {
            $cursor.removeClass('active');
        });

    // Header Scroll Effect
    $(window).on('scroll', function () {
        if ($(window).scrollTop() > 100) {
            $('#header').addClass('scrolled');
        } else {
            $('#header').removeClass('scrolled');
        }
    });

    // Fade-in on Scroll
    function checkFadeIn() {
        $('.fade-in').each(function () {
            const elementTop = $(this).offset().top;
            const windowBottom = $(window).scrollTop() + $(window).height();
            if (elementTop < windowBottom - 100) {
                $(this).addClass('visible');
            }
        });
    }

    $(window).on('scroll', checkFadeIn);
    checkFadeIn();

    // Form Submit
    $('#contactform').on('submit', function (e) {
        e.preventDefault();

        const name = $('#name').val();
        const email = $('#email').val();
        const subject = $('#subject').val();
        const message = $('#message').val();

        if (name && email && subject && message) {
            $('#success').fadeIn();
            $('#contactform').trigger('reset');

            setTimeout(function () {
                $('#success').fadeOut();
            }, 5000);
        }
    });
});

// Page Navigation
function showPage(pageId) {
    $('.page').removeClass('active');
    $('#' + pageId).addClass('active');
    window.scrollTo(0, 0);
}

function showProject(projectId) {
    showPage(projectId);
}

const SERVICE_ID = 'service_1kfbh7g';
const TEMPLATE_ID = 'template_nk1wngq';
const PUBLIC_KEY = 'bV9yY9jC77U4x1Mu5';

emailjs.init(PUBLIC_KEY);

const contactForm = document.getElementById('contactform');
const formMessage = document.getElementById('form-message');
const submitButton = contactForm.querySelector('.submit-btn');

// Função para exibir a mensagem de sucesso ou erro
function displayMessage(message, isSuccess) {
    formMessage.textContent = message;
    formMessage.style.color = isSuccess ? 'green' : 'red';
    formMessage.style.display = 'block';
}

// Event Listener para a submissão do formulário
contactForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Impede o envio tradicional do formulário
    formMessage.style.display = 'none'; // Esconde mensagens anteriores

    // Desabilita o botão para evitar múltiplos cliques
    submitButton.disabled = true;
    submitButton.textContent = 'Enviando...';

    // Envia o formulário usando emailjs.sendForm
    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target).then(
        () => {
            // Sucesso no envio
            displayMessage(
                '✓ Mensagem enviada! Retornarei em breve.',
                true // Indica sucesso
            );
            contactForm.reset(); // Limpa o formulário

            // Restaura o botão
            submitButton.disabled = false;
            submitButton.textContent = 'Enviar Mensagem';
        },
        (error) => {
            // Falha no envio
            console.error('Falha ao enviar o e-mail:', error);
            displayMessage(
                'O envio falhou. Por favor, tente novamente mais tarde.',
                false // Indica falha
            );

            // Restaura o botão
            submitButton.disabled = false;
            submitButton.textContent = 'Enviar Mensagem';
        }
    );
});
