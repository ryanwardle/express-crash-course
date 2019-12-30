const express = require('express');
const router = express.Router();
const members = require('../../Members.js');
const uuid = require('uuid');


// All these routes have /api/members prefix, look in index.js file
// gets all members
router.get('/', (req, res) => {
  res.json(members);
});

// get single members
router.get('/:id', (req, res) => {
  // Checks to see if found, returns boolean
  const found = members.some(member => member.id === parseInt(req.params.id));

  if(found) {
    res.json(members.filter(member => member.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `Cannot find member with id ${req.params.id}`})
  }
});

// create new member
router.post('/', (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: 'active'
  }

  if(!req.body.name || !req.body.email) {
    return res.status(400).json({msg: 'Please include a name and email.'})
  }

  // adds new member
  members.push(newMember);

  // returns all members
  res.json(members);
  // res.redirect('/');
});

// get single members
router.put('/:id', (req, res) => {
  // Checks to see if found, returns boolean
  const found = members.some(member => member.id === parseInt(req.params.id));

  if(found) {
    const updateMember = req.body;

    members.forEach(member => {
      if(member.id === parseInt(req.params.id)) {
        member.name = updateMember.name ? updateMember.name : member.name;
        member.email = updateMember.email ? updateMember.email : member.email;

        res.json({msg: 'Member has been updated', member})
      }
    })
  } else {
    res.status(400).json({ msg: `Cannot find member with id ${req.params.id}`})
  }
});

// delete member
router.delete('/:id', (req, res) => {
  // Checks to see if found, returns boolean
  const found = members.some(member => member.id === parseInt(req.params.id));

  if(found) {
    res.json({msg: 'Member deleted', members: members.filter(member => member.id !== parseInt(req.params.id))});
  } else {
    res.status(400).json({ msg: `Cannot find member with id ${req.params.id}`})
  }
});

module.exports = router;
