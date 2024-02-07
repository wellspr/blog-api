const express = require("express");
const { Deta } = require("deta");
 
const api = express.Router();

const deta = Deta();
const db = deta.Base("posts_db");

api.route("/posts")
    .get((req, res) => {
        db.fetch()
            .then(r => {
                res.json(r);
            })
            .catch(err => {
                res.json(err);
            });
    })
    .post((req, res) => {

        const newPost = {
            ...req.body, 
            createdAt: Date.now(),
            updatedAt: undefined,
            deleted: false,
        };

        db.put(newPost)
            .then(r => {
                res.json(r);
            })
            .catch(err => {
                res.json(err);
            });
    });

api.route("/post/:id")
    .get((req, res) => {
        db.get(req.params.id)
            .then(r => {
                res.json(r);
            })
            .catch(err => {
                res.json(err);
            });
    })
    .put((req, res) => {

        const update = { 
            ...req.body,
            updatedAt: Date.now(),
        };

        db.update(update, req.params.id)
            .then(r => {
                res.json(r);
            })
            .catch(err => {
                res.json(err);
            });
    })
    .delete((req, res) => {
        db.delete(req.params.id)
            .then(r => {
                res.json(r);
            })
            .catch(err => {
                res.json(err);
            });
    });

module.exports = api;