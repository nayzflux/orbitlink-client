export const formatDate = (date)=> {
    const annee = date.getFullYear();
    const mois = padZero(date.getMonth() + 1);
    const jour = padZero(date.getDate());
    const heure = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());

    return annee + '-' + mois + '-' + jour + 'T' + heure + ':' + minutes;
}

function padZero(valeur) {
    return valeur < 10 ? '0' + valeur : valeur;
}
