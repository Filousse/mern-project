const UserModel = require("../models/user.model");
// const BeneficaryModel = require("../models/beneficary.model");
const ObjectID = require("mongoose").Types.ObjectId;


module.exports.followByEducatif = async (req, res) => {
    if (
      !ObjectID.isValid(req.params.id) ||
      !ObjectID.isValid(req.body.idToFollow)
    )
      return res.status(400).send("ID unknown : " + req.params.id);
  
    try {
      // add to the benificaryRef list in users DB
      await UserModel.findByIdAndUpdate(
        req.params.id,
        { $addToSet: { benificaryRef: req.body.idToFollow } },
        { new: true, upsert: true },
        (err, docs) => {
          if (!err) res.status(201).json(docs);
          else return res.status(400).jsos(err);
        }
      );
      // add to educatifRef in beneficary DB
      await UserModel.findByIdAndUpdate(
        req.body.idToFollow,
        { $addToSet: { educatifRef: req.params.id } },
        { new: true, upsert: true },
        (err, docs) => {
          if (!err) res.status(201).json(docs);
          if (err) return res.status(400).jsos(err);
        }
      );
    } catch (err) {
      return res.status(500).json({ message: err });
    }
};

module.exports.followByMedical = async (req, res) => {
    if (
      !ObjectID.isValid(req.params.id) ||
      !ObjectID.isValid(req.body.idToFollow)
    )
      return res.status(400).send("ID unknown : " + req.params.id);
  
    try {
      // add to the benificaryRef list in users DB
      await UserModel.findByIdAndUpdate(
        req.params.id,
        { $addToSet: { benificaryRef: req.body.idToFollow } },
        { new: true, upsert: true },
        (err, docs) => {
          if (!err) res.status(201).json(docs);
          else return res.status(400).jsos(err);
        }
      );
      // add to medicalRef in beneficary DB
      await UserModel.findByIdAndUpdate(
        req.body.idToFollow,
        { $addToSet: { medicalRef: req.params.id } },
        { new: true, upsert: true },
        (err, docs) => {
          if (!err) res.status(201).json(docs);
          if (err) return res.status(400).jsos(err);
        }
      );
    } catch (err) {
      return res.status(500).json({ message: err });
    }
};
  
module.exports.unFollowByEducatif = async (req, res) => {
    if (
      !ObjectID.isValid(req.params.id) ||
      !ObjectID.isValid(req.body.idToUnfollow)
    )
      return res.status(400).send("ID unknown : " + req.params.id);

    try {
      // remove to the benificaryRef list in users DB
      await UserModel.findByIdAndUpdate(
        req.params.id,
        { $pull: { benificaryRef: req.body.idToUnfollow } },
        { new: true, upsert: true },
        (err, docs) => {
          if (!err) res.status(201).json(docs);
          else return res.status(400).jsos(err);
        }
      );
      // remove to educatifRef in beneficary DB
      await UserModel.findByIdAndUpdate(
        req.body.idToUnfollow,
        { $pull: { educatifRef: req.params.id } },
        { new: true, upsert: true },
        (err, docs) => {
          // if (!err) res.status(201).json(docs);
          if (err) return res.status(400).jsos(err);
        }
      );
    } catch (err) {
      return res.status(500).json({ message: err });
    }
};

module.exports.unFollowByMedical = async (req, res) => {
    if (
      !ObjectID.isValid(req.params.id) ||
      !ObjectID.isValid(req.body.idToUnfollow)
    )
      return res.status(400).send("ID unknown : " + req.params.id);

    try {
      // remove to the benificaryRef list in users DB
      await UserModel.findByIdAndUpdate(
        req.params.id,
        { $pull: { benificaryRef: req.body.idToUnfollow } },
        { new: true, upsert: true },
        (err, docs) => {
          if (!err) res.status(201).json(docs);
          else return res.status(400).jsos(err);
        }
      );
      // remove to medicalRef in beneficary DB
      await UserModel.findByIdAndUpdate(
        req.body.idToUnfollow,
        { $pull: { medicalRef: req.params.id } },
        { new: true, upsert: true },
        (err, docs) => {
          // if (!err) res.status(201).json(docs);
          if (err) return res.status(400).jsos(err);
        }
      );
    } catch (err) {
      return res.status(500).json({ message: err });
    }
};
  