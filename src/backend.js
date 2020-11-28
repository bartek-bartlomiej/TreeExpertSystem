import pl from 'tau-prolog'

const database = [
    "drzewo(dab,zimozielone(nie),kora(bura),pokroj(okraglawy),korona([rozlozysta, kopulasta]),owoc(zoladz),lisciaste(liscie(ksztalt([klapiste, odwrocone_serca]),krawedz(gladka),polozenie(skretolegle),krotnosc(pojedyncze)))).",
    "drzewo(lipa,zimozielone(nie),kora(brunatna),pokroj(okraglawy),korona(rozlozysta),owoc(orzech),lisciaste(liscie(ksztalt(sercowate),krawedz(pilkowana),polozenie(skretolegle),krotnosc(pojedyncze)))).",
    "drzewo(jarzab,zimozielone(nie),kora(jasna),pokroj(okraglawy),korona(luzna),owoc(kulka),lisciaste(liscie(ksztalt(podluzne),krawedz(pilkowana),polozenie(skretolegle),krotnosc(pierzasto_zlozone)))).",
    "drzewo(olcha,zimozielone(nie),kora(szara),pokroj(okraglawy),korona(kopulasta),owoc(orzech),lisciaste(liscie(ksztalt(jajowate),krawedz(pilkowana),polozenie(naprzemianlegle),krotnosc(pojedyncze)))).",
    "drzewo(buk,zimozielone(nie),kora([popielata, szara]),pokroj([okraglawy, kolumnowy]),korona([gesta, szeroka]),owoc(bukiew),lisciaste(liscie(ksztalt(eliptyczne),krawedz([karbowana, zabkowana]),polozenie(naprzemianlegle),krotnosc(pojedyncze)))).",
    "drzewo(grab,zimozielone(nie),kora(popielata),pokroj(okraglawy),korona(rozlozysta),owoc(orzech),lisciaste(liscie(ksztalt([eliptyczne, jajowate]),krawedz(pilkowana),polozenie(skretolegle),krotnosc(pojedyncze)))).",
    "drzewo(brzoza,zimozielone(nie),kora(biala),pokroj(kolumnowy),korona(luzna),owoc(orzech),lisciaste(liscie(ksztalt([okraglawe, jajowate]),krawedz(pilkowana),polozenie(skretolegle),krotnosc(pojedyncze)))).",
    "drzewo(kasztanowiec,zimozielone(nie),kora([olowianoszara, ciemnobrazowa]),pokroj(okraglawy),korona(kopulasta),owoc(kasztan),lisciaste(liscie(ksztalt(palczaste),krawedz(pilkowana),polozenie(skretolegle),krotnosc(pojedyncze)))).",

    "drzewo(sosna,zimozielone(tak),kora([szara, brazowa]),pokroj(stozkowaty),korona(luzna),owoc(szyszka),iglaste(igly(dlugosc(dlugie),miekkosc(klujace),kolor(niebiesko_zielone)),szyszka(ksztalt(okraglawy),wektor(?)))).",
    "drzewo(jodla,zimozielone(tak),kora([popielata, szara]),pokroj(stozkowaty),korona(stozkowata),owoc(szyszka),iglaste(igly(dlugosc(krotkie),miekkosc(miekkie),kolor(zielony_z_2_paskami)),szyszka(ksztalt(podluzny),wektor(wzniesiona)))).",
    "drzewo(swierk,zimozielone(tak),kora(bura),pokroj(stozkowaty),korona(stozkowata),owoc(szyszka),iglaste(igly(dlugosc(krotkie),miekkosc(klujace),kolor(zielone)),szyszka(ksztalt(podluzny),wektor(zwisajaca)))).",
    "drzewo(modrzew,zimozielone(nie),kora(brazowa),pokroj(stozkowaty),korona([stozkowata, luzna]),owoc(szyszka),iglaste(igly(dlugosc(krotkie),miekkosc(klujace),kolor(zielone)),szyszka(ksztalt(okraglawy),wektor(?))))."
]

const rules = [
    "znajdz(X) :- lisciaste(X), !.",  
    "znajdz(X) :- iglaste(X).",
    
    "lisciaste(X) :- testuj_typ(lisciaste),drzewo(X,_,_,_,_,_,lisciaste(liscie(ksztalt(Ksztalt),krawedz(Krawedz),polozenie(Polozenie),krotnosc(Krotnosc)))),testuj_lisciaste(X, Ksztalt, Krawedz, Polozenie, Krotnosc).",
    "testuj_lisciaste(X, Ksztalt, Krawedz, Polozenie, Krotnosc) :- czy_liscie(Ksztalt, Krawedz, Polozenie, Krotnosc), cechy_wspolne(X), !.",
    "testuj_lisciaste(_, Ksztalt, Krawedz, Polozenie, Krotnosc) :- czy_liscie(Ksztalt, Krawedz, Polozenie, Krotnosc).",

    "iglaste(X) :-testuj_typ(iglaste),drzewo(X,_,_,_,_,_,iglaste(igly(dlugosc(Dlugosc),miekkosc(Miekkosc),kolor(Kolor)),szyszka(ksztalt(Ksztalt),wektor(Wektor)))),testuj_iglaste(X, Dlugosc, Miekkosc, Kolor, Ksztalt, Wektor).",
    "testuj_iglaste(X, Dlugosc, Miekkosc, Kolor, Ksztalt, Wektor) :- czy_igly(Dlugosc, Miekkosc, Kolor), czy_szyszka(Ksztalt, Wektor),cechy_wspolne(X), !.",
    "testuj_iglaste(_, Dlugosc, Miekkosc, Kolor, Ksztalt, Wektor) :- czy_igly(Dlugosc, Miekkosc, Kolor), czy_szyszka(Ksztalt, Wektor), !.",
    "testuj_iglaste(_, Dlugosc, Miekkosc, Kolor, _, _) :- czy_igly(Dlugosc, Miekkosc, Kolor), !.",
    "testuj_iglaste(_, _, _, _, Ksztalt, Wektor) :- czy_szyszka(Ksztalt, Wektor).",

    "testuj_typ(Typ) :- czy_prawda(typ, Typ).",

    "cechy_wspolne(X) :-drzewo(X,zimozielone(Zimozielone),kora(Kora),pokroj(Pokroj),korona(Korona),owoc(Owoc),_),",
    "testuj_cechy_wspolne(Zimozielone, Kora, Pokroj, Korona, Owoc).",
    "testuj_cechy_wspolne(Zimozielone, Kora, Pokroj, Korona, Owoc) :- testuj_kpk(Kora, Pokroj, Korona), czy_zimozielone(Zimozielone), czy_owoc(Owoc), !.",
    "testuj_cechy_wspolne(Zimozielone, _, _, _, Owoc) :- czy_zimozielone(Zimozielone), czy_owoc(Owoc).",

    "testuj_kpk(Kora, Pokroj, Korona) :- czy_kora(Kora),czy_pokroj(Pokroj),czy_korona(Korona), !.",
    "testuj_kpk(_, Pokroj, Korona) :- czy_pokroj(Pokroj), czy_korona(Korona).",

    "czy_liscie(Ksztalt, Krawedz, Polozenie, Krotnosc) :- czy_prawda(ksztalt_liscia, Ksztalt), czy_prawda(krawedz_liscia, Krawedz), czy_prawda(polozenie_liscia, Polozenie), czy_prawda(krotnosc_liscia, Krotnosc), !.", 
    "czy_liscie(Ksztalt, Krawedz, _, _) :- czy_prawda(ksztalt_liscia, Ksztalt), czy_prawda(krawedz_liscia, Krawedz), !.",
    "czy_liscie(Ksztalt, _, _, _) :- czy_prawda(ksztalt_liscia, Ksztalt).",

    "czy_igly(Dlugosc, Miekkosc, Kolor) :- czy_prawda(miekkosc_igly, Miekkosc), czy_prawda(kolor_igly, Kolor), czy_prawda(dlugosc_igly, Dlugosc), !.",
    "czy_igly(Dlugosc, _, Kolor) :- czy_prawda(kolor_igly, Kolor), czy_prawda(dlugosc_igly, Dlugosc), !.",
    "czy_igly(Dlugosc, _, _) :- czy_prawda(dlugosc_igly, Dlugosc).",

    "czy_szyszka(Ksztalt, Wektor) :- czy_prawda(ksztalt_szyszki, Ksztalt), czy_prawda(wektor_szyszki, Wektor), !.",
    "czy_szyszka(Ksztalt, _) :- czy_prawda(ksztalt_szyszki, Ksztalt), !.",
    "czy_szyszka(_, Wektor) :- czy_prawda(wektor_szyszki, Wektor).",

    "czy_zimozielone(X) :- czy_prawda(zimozielone, X).",
    "czy_kora(Kora) :- czy_prawda(kora, Kora).",
    "czy_pokroj(Pokroj) :- czy_prawda(pokroj, Pokroj).",  
    "czy_korona(Korona) :- czy_prawda(korona, Korona).",
    "czy_owoc(Owoc) :- czy_prawda(owoc, Owoc).",

    ":- dynamic([znane/2]).",
    "czy_prawda(X, [Y | _]) :- czy_prawda(X, Y), !.",
    "czy_prawda(X, [_ | Ys]) :- czy_prawda(X, Ys), !.",
    "czy_prawda(_, []) :- false.",
    "czy_prawda(X, Y) :- znane(X, Y), !."
]

const findRule = "znajdz(X)"


function getAnswersProvider(facts) {
    return new Promise((resolve, reject) => {
        const query = getGoalQuery(facts)
        console.log(query)

        getQueryProvider(query).then(session => {
            let answers = []

            answerReader(session)
                .then(answer => next(answer))
                .catch(reason => reject(reason))

            function next(answer) {
                if (answer === false) {
                    resolve(answers)
                    return
                }
                answers.push(answer)

                answerReader(session)
                    .then(answer => next(answer))
                    .catch(reason => reject(reason))
            }

        }).catch(reason => {
            reject(reason)
        })
    })
}

function answerReader(session) {
    return new Promise((resolve, reject) => {
        session.answer({
            success: answer => resolve(answer.links["X"].id),
            error: err => reject(err),
            fail: () => resolve(false),
            limit: () => reject('limit exceeded.')
        })
    })
}

function getGoalQuery(facts) {
    return [
        ...facts.map((fact) => getAssertRule(fact)),
        findRule
    ].join(", ") + "."
}

function getAssertRule({key, value}) {
    return `assertz(znane(${key}, ${value}))`
}


function getQueryProvider(query) {
    return new Promise((resolve, reject) => {
        getSessionProvider().then(session => {
            session.query(query, {
                success: () => resolve(session),
                error: (err) => reject(err)
            })
        }).catch(reason => {
            reject(reason)
        })
    })
}


function getSessionProvider() {
    return new Promise((resolve, reject) => {
        const program = getProgram()
        const session = pl.create()
        session.consult( program, {
            success: () => resolve(session),
            error: (err) => reject(err)
        } )
    })
}

function getProgram() {
    return [
        ...database,
        ...rules
    ].join(" ")
}


export { getAnswersProvider }
