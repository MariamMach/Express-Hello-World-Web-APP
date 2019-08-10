const express = require('express');
const router = express.Router();
const { data } = require('../data/flashcardData.json');
const { cards } = data;

router.get('/', (req, res) => {
    const numberOfCards = cards.length;
    const flashcardsId = Math.floor( Math.random() * numberOfCards );
    res.redirect(`/cards/${flashcardsId}?side=question`);
});

router.get('/:id', (req, res) => {
    const {side } = req.query;
    const { id } = req.params;

    if( !side ) {
        return res.redirect(`/cards/${id}?side=question`);
    }
    const name = req.cookies.username;
    const text = cards[id][side];
    const { hint } = cards[id];
    const templatedata = { id, text, name };

    if(side === 'question') {
        templatedata.hint = hint;
        templatedata.sideToShow = 'answer';
        templatedata.sideToShowDisplay = 'Answer';
    } else if ( side === 'answer') {
        templatedata.sideToShow = 'question';
        templatedata.sideToShowDisplay = 'Question';
    }

    res.render('card', templatedata);     
});

module.exports = router;