import express from "express";
import { Deta } from "deta";
 
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
        db.put(req.body)
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
        db.update(req.body, req.params.id)
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

export default api;