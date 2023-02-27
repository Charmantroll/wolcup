const BotonPortapapeles = document.getElementById('Portapapeles')

function CopiarXD() {
    var copyText = document.getElementById("TokenString");
    console.log(copyText)
    navigator.clipboard.writeText(copyText.innerText);
}

BotonPortapapeles.onclick = function() {
    CopiarXD()
    Swal.fire({
        title: "¡Listo!",
        text: "Se ha copiado el token al portapapeles",
        icon: "success",
        confirmButtonText: "Aceptar"
    });
}