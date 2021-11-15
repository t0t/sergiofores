export function inputFecha (f1) {
  var aFecha1 = f1.split('-') // ['1975', '10', '15']
  var fFecha1 = Date.UTC(aFecha1[0], aFecha1[1] - 1, aFecha1[2])
  var fFecha2 = Date.UTC(aFecha1[0], -0, 0)
  agnio = aFecha1[0]
  var dif = (fFecha1 - fFecha2) / (1000 * 60 * 60 * 24)
  return Math.floor(dif)
}

// dias del año transcurridos hasta hoy
export function diasTranscurridos (fechaactual) {
  let previo = new Date(fechaactual.getFullYear(), 0, 1)
  let actual = new Date(fechaactual.getTime())

  return Math.ceil((actual - previo + 1) / 86400000)
}

// Codigo nombre
export function extraeValoresLetras (cadenaTexto) {
  const diccionario = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
    f: 6,
    g: 7,
    h: 8,
    i: 9,
    j: 10,
    k: 11,
    l: 12,
    m: 13,
    n: 14,
    ñ: 15,
    o: 16,
    p: 17,
    q: 18,
    r: 19,
    s: 20,
    t: 21,
    u: 22,
    v: 23,
    w: 24,
    x: 25,
    y: 26,
    z: 27
  }

  if (cadenaTexto.length == 1) {
    return diccionario[cadenaTexto] || ' '
  }
  return cadenaTexto.split('').map(extraeValoresLetras)
}

function esAgnioBisiesto (agnio) {
  return agnio % 400 == 0 || (agnio % 100 != 0 && agnio % 4 == 0)
}

export function obtenerCantidadDias (agnio) {
  return esAgnioBisiesto(agnio) ? 366 : 365
}
