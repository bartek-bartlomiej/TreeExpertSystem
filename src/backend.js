import pl from 'tau-prolog'

const database = [
    "dom(pierwszy, kolor(zielony), numer(nieparzysty)).",
    "dom(drugi, kolor(zolty), numer(parzysty)).",
    "dom(czwarty, kolor(czerwony), numer(parzysty)).",
    "dom(kwantowy, kolor(zielony), numer([nieparzysty, parzysty]))."
]

const rules = [
    "znajdz(X) :- dom(X, kolor(Kolor), numer(Numer) ), testuj(Kolor, Numer).",

    "testuj(Kolor, Numer) :- czy_kolor(Kolor), czy_numer(Numer), !.",
    "testuj(Kolor, _) :- czy_kolor(Kolor).",

    "czy_kolor(X) :- czy_prawda(kolor, X).",
    "czy_numer(X) :- czy_prawda(numer, X).",

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
