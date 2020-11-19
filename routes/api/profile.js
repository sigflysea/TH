const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');
const request = require('request');
const config = require('config');
const { check, validationResult } = require('express-validator');
const { ContextRunnerImpl } = require('express-validator/src/chain');
const normalize = require('normalize-url');

//@route   Get api/profile
//@desc    Test route
//@access  Public
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.userP.id,
        }).populate('user', ['name', 'avatar']);
        if (!profile) {
            return res
                .status(400)
                .json({ meg: 'This is no profile for this user' });
        }
        res.json(profile);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

router.post('/', [auth], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {
        location,
        interests,
        bio,
        youtube,
        twitter,
        instagram,
        linkedin,
        facebook,
    } = req.body;

    const profileFields = {
        user: req.userP.id,
        location,
        interests,
        bio,
    };

    // Build social object and add to profileFields
    const socialfields = {
        youtube,
        twitter,
        instagram,
        linkedin,
        facebook,
    };

    for (const [key, value] of Object.entries(socialfields)) {
        if (value && value.length > 0)
            socialfields[key] = normalize(value, { forceHttps: true });
    }
    profileFields.social = socialfields;

    try {
        // Using upsert option (creates new doc if no match is found):
        let profile = await Profile.findOneAndUpdate(
            { user: req.userP.id },
            { $set: profileFields },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//Get all profile
//public
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', [
            'name',
            'avatar',
        ]);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

//Get profile by user ID
//private
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.params.user_id,
        }).populate('user', ['name', 'avatar']);
        if (!profile) {
            return res.status(400).json({ msg: 'no user found' });
        }
        res.json(profile);
    } catch (err) {
        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'no user found' });
        }
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

//Delete profile and user by token authorization
//private
router.delete('/', auth, async (req, res) => {
    try {
        await Profile.findOneAndRemove({ user: req.userP.id });
        await Post.deleteMany({ user: req.userP.id });
        await User.findOneAndRemove({ _id: req.userP.id });
        res.json({ meg: 'User deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// PUT route to udpate the experience
// private
router.put(
    '/tripLog',
    [auth, [check('from', 'From is required').not().isEmpty()]],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { location, from, to, current, description } = req.body;
        const newExp = { location, from, to, current, description };

        try {
            let profile = await Profile.findOne({ user: req.userP.id });
            if (profile) {
                profile.tripLog.unshift(newExp);
                await profile.save();
                return res.json(profile);
            }
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }
);
//Delete profile trip
//private
router.delete('/tripLog/:trip_id', auth, async (req, res) => {
    try {
        let profile = await Profile.findOne({ user: req.userP.id });
        //this check is no checking againt the exp_id, not useful
        if (!profile) {
            return res.status(400).json({ msg: 'no matching trip' });
        }
        //Get remove index
        const removeIndex = profile.tripLog
            .map((item) => item.id)
            .indexOf(req.params.trip_id);

        profile.tripLog.splice(removeIndex, 1);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
