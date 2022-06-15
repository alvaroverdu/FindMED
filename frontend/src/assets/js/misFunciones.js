const misFunciones = () => {
    if (document.getElementById('kommunicate-widget-iframe')) {
        document.getElementById('kommunicate-widget-iframe').remove();
        //console.log('etiqueta eliminada')
        for (let i = 0; i < document.scripts.length; i++) {
            if (document.scripts[i].src == 'https://widget.kommunicate.io/v2/kommunicate.app') {
                document.scripts[i].remove();
                //console.log('script eliminado');
                break;
            }
        }
    }
}