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

    "drzewo(sosna,zimozielone(tak),kora([szara, brazowa]),pokroj(stozkowaty),korona(luzna),owoc(szyszka),iglaste(igly(dlugosc(dlugie),miekkosc(klujace),kolor(niebiesko_zielone)),szyszka(ksztalt(okraglawy),wektor(wzniesiona)))).",
    "drzewo(jodla,zimozielone(tak),kora([popielata, szara]),pokroj(stozkowaty),korona(stozkowata),owoc(szyszka),iglaste(igly(dlugosc(krotkie),miekkosc(miekkie),kolor(zielony_z_2_paskami)),szyszka(ksztalt(podluzny),wektor(wzniesiona)))).",
    "drzewo(swierk,zimozielone(tak),kora(bura),pokroj(stozkowaty),korona(stozkowata),owoc(szyszka),iglaste(igly(dlugosc(krotkie),miekkosc(klujace),kolor(zielone)),szyszka(ksztalt(podluzny),wektor(zwisajaca)))).",
    "drzewo(modrzew,zimozielone(nie),kora(brazowa),pokroj(stozkowaty),korona([stozkowata, luzna]),owoc(szyszka),iglaste(igly(dlugosc(krotkie),miekkosc(klujace),kolor(zielone)),szyszka(ksztalt(okraglawy),wektor(wzniesiona)))).",

    "specjalne_punkty(dab, zoladz, 4).",
    "specjalne_punkty(lipa, brunatna, 2).",
    "specjalne_punkty(jarzab, kulka, 3).",
    "specjalne_punkty(buk, bukiew, 4).",
    "specjalne_punkty(brzoza, biala, 4).",
    "specjalne_punkty(kasztanowiec, kasztan, 4).",
    "specjalne_punkty(kasztanowiec, palczaste, 3).",
    "specjalne_punkty(sosna, niebiesko_zielone, 2).",
    "specjalne_punkty(jodla, zielony_z_2_paskami, 2).",
    "specjalne_punkty(swierk, zwisajaca, 2).",
    "specjalne_punkty(modrzew, nie, 3)."
]

const rules = [
    "znajdz(T, P) :- lisciaste(T, P).",
    "znajdz(T, P) :- iglaste(T, P).",

    "lisciaste(T, P) :- testuj_typ(lisciaste), drzewo(T,_,_,_,_,_,lisciaste(liscie(ksztalt(Ksztalt),krawedz(Krawedz),polozenie(Polozenie),krotnosc(Krotnosc)))), testuj_lisciaste(T, Ksztalt, Krawedz, Polozenie, Krotnosc, P).",
    "testuj_lisciaste(T, Ksztalt, Krawedz, Polozenie, Krotnosc, P) :- czy_liscie(T, Ksztalt, Krawedz, Polozenie, Krotnosc, P1), cechy_wspolne(T, P2), P is P1 + P2, !.",
    "testuj_lisciaste(T, Ksztalt, Krawedz, Polozenie, Krotnosc, P) :- czy_liscie(T, Ksztalt, Krawedz, Polozenie, Krotnosc, P), !.",
    "testuj_lisciaste(T, _, _, _, _, P) :- cechy_wspolne(T, P).",

    "iglaste(T, P) :- testuj_typ(iglaste), drzewo(T,_,_,_,_,_,iglaste(igly(dlugosc(Dlugosc),miekkosc(Miekkosc),kolor(Kolor)),szyszka(ksztalt(Ksztalt),wektor(Wektor)))), testuj_iglaste(T, Dlugosc, Miekkosc, Kolor, Ksztalt, Wektor, P).",
    "testuj_iglaste(T, Dlugosc, Miekkosc, Kolor, Ksztalt, Wektor, P) :- czy_igly(T, Dlugosc, Miekkosc, Kolor, P1), czy_szyszka(T, Ksztalt, Wektor, P2), cechy_wspolne(T, P3), P is P1 + P2 + P3, !.",
    "testuj_iglaste(T, Dlugosc, Miekkosc, Kolor, Ksztalt, Wektor, P) :- czy_igly(T, Dlugosc, Miekkosc, Kolor, P1), czy_szyszka(T, Ksztalt, Wektor, P2), P is P1 + P2, !.",
    "testuj_iglaste(T, Dlugosc, Miekkosc, Kolor, _, _, P) :- czy_igly(T, Dlugosc, Miekkosc, Kolor, P1), cechy_wspolne(T, P2), P is P1 + P2, !.",
    "testuj_iglaste(T, _, _, _, Ksztalt, Wektor, P) :- czy_szyszka(T, Ksztalt, Wektor, P1), cechy_wspolne(T, P2), P is P1 + P2, !.",
    "testuj_iglaste(T, Dlugosc, Miekkosc, Kolor, _, _, P) :- czy_igly(T, Dlugosc, Miekkosc, Kolor, P), !.",
    "testuj_iglaste(T, _, _, _, Ksztalt, Wektor, P) :- czy_szyszka(T, Ksztalt, Wektor, P).",
    "testuj_iglaste(T, _, _, _, _, _, P) :- cechy_wspolne(T, P).",


    "cechy_wspolne(T, P) :- drzewo(T, zimozielone(Zimozielone), kora(Kora), pokroj(Pokroj), korona(Korona), owoc(Owoc), _), testuj_cechy_wspolne(T, Zimozielone, Kora, Pokroj, Korona, Owoc, P).",
    "testuj_cechy_wspolne(T, Zimozielone, Kora, Pokroj, Korona, Owoc, P) :- testuj_kpk(T, Kora, Pokroj, Korona, P1), czy_zimozielone(T, Zimozielone, P2), czy_owoc(T, Owoc, P3), P is P1 + P2 + P3, !.",
    "testuj_cechy_wspolne(T, Zimozielone, Kora, Pokroj, Korona, _, P) :- testuj_kpk(T, Kora, Pokroj, Korona, P1), czy_zimozielone(T, Zimozielone, P2), P is P1 + P2, !.",
    "testuj_cechy_wspolne(T, _, Kora, Pokroj, Korona, Owoc, P) :- testuj_kpk(T, Kora, Pokroj, Korona, P1), czy_owoc(T, Owoc, P2), P is P1 + P2, !.",
    "testuj_cechy_wspolne(T, Zimozielone, _, _, _, Owoc, P) :- czy_zimozielone(T, Zimozielone, P1), czy_owoc(T, Owoc, P2), P is P1 + P2, !.",
    "testuj_cechy_wspolne(T, _, Kora, Pokroj, Korona, _, P) :- testuj_kpk(T, Kora, Pokroj, Korona, P).",
    "testuj_cechy_wspolne(T, Zimozielone, _, _, _, _, P) :- czy_zimozielone(T, Zimozielone, P).",
    "testuj_cechy_wspolne(T, _, _, _, _, Owoc, P) :- czy_owoc(T, Owoc, P).",

    "testuj_kpk(T, Kora, Pokroj, Korona, P) :- czy_kora(T, Kora, P1), czy_pokroj(T, Pokroj, P2), czy_korona(T, Korona, P3), P is P1 + P2 + P3, !.",
    "testuj_kpk(T, Kora, Pokroj, _, P) :- czy_kora(T, Kora, P1), czy_pokroj(T, Pokroj, P2), P is P1 + P2, !.",
    "testuj_kpk(T, _, Pokroj, Korona, P) :- czy_pokroj(T, Pokroj, P1), czy_korona(T, Korona, P2), P is P1 + P2, !.",
    "testuj_kpk(T, Kora, _, Korona, P) :- czy_kora(T, Kora, P1), czy_korona(T, Korona, P2), P is P1 + P2, !.",
    "testuj_kpk(T, Kora, _, _, P) :- czy_kora(T, Kora, P).",
    "testuj_kpk(T, _, Pokroj, _, P) :- czy_pokroj(T, Pokroj, P).",
    "testuj_kpk(T, _, _, Korona, P) :- czy_korona(T, Korona, P).",

    "czy_liscie(T, Ksztalt, Krawedz, Polozenie, Krotnosc, P) :- testuj_kk(T, Ksztalt, Krawedz, P1), testuj_pk(T, Polozenie, Krotnosc, P2), P is P1 + P2, !.",
    "czy_liscie(T, Ksztalt, Krawedz, _, _, P) :- testuj_kk(T, Ksztalt, Krawedz, P).",
    "czy_liscie(T, _, _, Polozenie, Krotnosc, P) :- testuj_pk(T, Polozenie, Krotnosc, P).",

    "testuj_kk(T, Ksztalt, Krawedz, P) :- czy_ksztalt_liscia(T, Ksztalt, P1), czy_krawedz_liscia(T, Krawedz, P2), P is P1 + P2, !.",
    "testuj_kk(T, Ksztalt, _, P) :- czy_ksztalt_liscia(T, Ksztalt, P).",
    "testuj_kk(T, _, Krawedz, P) :- czy_krawedz_liscia(T, Krawedz, P).",

    "testuj_pk(T, Polozenie, Krotnosc, P) :-  czy_polozenie_liscia(T, Polozenie, P1), czy_krotnosc_liscia(T, Krotnosc, P2), P is P1 + P2, !.",
    "testuj_pk(T, Polozenie, _, P) :- czy_polozenie_liscia(T, Polozenie, P).",
    "testuj_pk(T, _, Krotnosc, P) :- czy_krotnosc_liscia(T, Krotnosc, P).",

    "czy_igly(T, Dlugosc, Miekkosc, Kolor, P) :- czy_miekkosc_igly(T, Miekkosc, P1), czy_kolor_igly(T, Kolor, P2), czy_dlugosc_igly(T, Dlugosc, P3), P is P1 + P2 + P3, !.",
    "czy_igly(T, Dlugosc, Miekkosc, _, P) :- czy_miekkosc_igly(T, Miekkosc, P1), czy_dlugosc_igly(T, Dlugosc, P2), P is P1 + P2, !.",
    "czy_igly(T, _, Miekkosc, Kolor, P) :- czy_miekkosc_igly(T, Miekkosc, P1), czy_kolor_igly(T, Kolor, P2), P is P1 + P2, !.",
    "czy_igly(T, Dlugosc, _, Kolor, P) :- czy_kolor_igly(T, Kolor, P1), czy_dlugosc_igly(T, Dlugosc, P2), P is P1 + P2, !.",
    "czy_igly(T, Dlugosc, _, _, P) :- czy_dlugosc_igly(T, Dlugosc, P).",
    "czy_igly(T, _, Miekkosc, _, P) :- czy_miekkosc_igly(T, Miekkosc, P).",
    "czy_igly(T, _, _, Kolor, P) :- czy_kolor_igly(T, Kolor, P).",


    "testuj_typ(Typ) :- czy_prawda(typ, Typ).",

    "czy_ksztalt_liscia(T, X, P) :- czy_prawda(ksztalt_liscia, X), daj_punkty(T, X, P).",
    "czy_krawedz_liscia(T, X, P) :- czy_prawda(krawedz_liscia, X), daj_punkty(T, X, P).",

    "czy_szyszka(T, Ksztalt, Wektor, P) :- czy_ksztalt_szyszki(T, Ksztalt, P1), czy_wektor_szyszki(T, Wektor, P2), P is P1 + P2, !.",
    "czy_szyszka(T, Ksztalt, _, P) :- czy_ksztalt_szyszki(T, Ksztalt, P).",
    "czy_szyszka(T, _, Wektor, P) :- czy_wektor_szyszki(T, Wektor, P).",

    "czy_polozenie_liscia(T, X, P) :- czy_prawda(polozenie_liscia, X), daj_punkty(T, X, P).",
    "czy_krotnosc_liscia(T, X, P) :- czy_prawda(krotnosc_liscia, X), daj_punkty(T, X, P).",

    "czy_dlugosc_igly(T, X, P) :- czy_prawda(dlugosc_igly, X), daj_punkty(T, X, P).",
    "czy_miekkosc_igly(T, X, P) :- czy_prawda(miekkosc_igly, X), daj_punkty(T, X, P).",
    "czy_kolor_igly(T, X, P) :- czy_prawda(kolor_igly, X), daj_punkty(T, X, P).",

    "czy_wektor_szyszki(T, X, P) :- czy_prawda(wektor_szyszki, X), daj_punkty(T, X, P).",
    "czy_ksztalt_szyszki(T, X, P) :- czy_prawda(ksztalt_szyszki, X), daj_punkty(T, X, P).",

    "czy_zimozielone(T, X, P) :- czy_prawda(zimozielone, X), daj_punkty(T, X, P).",
    "czy_kora(T, X, P) :- czy_prawda(kora, X), daj_punkty(T, X, P).",
    "czy_pokroj(T, X, P) :- czy_prawda(pokroj, X), daj_punkty(T, X, P).",
    "czy_korona(T, X, P) :- czy_prawda(korona, X), daj_punkty(T, X, P).",

    "czy_owoc(T, X, P) :- czy_prawda(owoc, X), daj_punkty(T, X, P).",

    "daj_punkty(T, X, P) :- specjalne_punkty(T, X, P), !.",
    "daj_punkty(_, _, P) :- P is 1.",

    ":- dynamic([znane/2]).",
    "czy_prawda(X, [Y | _]) :- czy_prawda(X, Y), !.",
    "czy_prawda(X, [_ | Ys]) :- czy_prawda(X, Ys), !.",
    "czy_prawda(_, []) :- false.",
    "czy_prawda(X, Y) :- znane(X, Y), !."
]

const findRule = "znajdz(T, P)"


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
            success: answer => {
                resolve({
                    tree: answer.links["T"].id,
                    score: answer.links["P"].value
                })
            },
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
        const session = pl.create(10_000)
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
