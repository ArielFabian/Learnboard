const { db } = require("../util/admin");

// Create a new colab-space
exports.createColabSpace = (req, res) => {
    // Get the data from the request body
    const newColabSpace = {
        name: req.body.name,
        description: req.body.description,
    };

    // Add the new colab-space to the "colab-spaces" collection
    db.collection("colab-spaces")
        .add(newColabSpace)
        .then((docRef) => {
            // Return the ID of the newly created colab-space
            res.json({ message: `Colab-space created with ID: ${docRef.id}` });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "Something went wrong" });
        });
};

// Get all colab-spaces
exports.getAllColabSpaces = (req, res) => {
    // Get all documents from the "colab-spaces" collection
    db.collection("colab-spaces")
        .get()
        .then((data) => {
            let colabSpaces = [];
            data.forEach((doc) => {
                // Push each colab-space document to the array
                result = {
                    id: doc.id,
                    data: doc.data()
                }
                colabSpaces.push(result);
            });
            // Return the array of colab-spaces
            res.json(colabSpaces);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "Something went wrong" });
        });
};

// Get a specific colab-space
exports.getColabSpaceId = (req, res) => {
    // Get the colab-space ID from the request parameters
    const colabSpaceId = req.params.id;

    // Get the document with the specified ID from the "colab-spaces" collection
    db.collection("colab-spaces")
        .doc(colabSpaceId)
        .get()
        .then((doc) => {
            if (doc.exists) {
                // Return the colab-space document
                res.json(doc.data());
            } else {
                res.status(404).json({ error: "Colab-space not found" });
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "Something went wrong" });
        });
};

// Update a colab-space
exports.updateColabSpace = (req, res) => {
    // Get the colab-space ID from the request parameters
    const colabSpaceId = req.params.id;

    // Get the updated data from the request body
    const updatedColabSpace = req.body;

    // Update the document with the specified ID in the "colab-spaces" collection
    db.collection("colab-spaces")
        .doc(colabSpaceId)
        .update(updatedColabSpace)
        .then(() => {
            res.json({ message: "Colab-space updated successfully" });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "Something went wrong" });
        });
};

// Delete a colab-space
exports.deleteColabSpace = (req, res) => {
    // Get the colab-space ID from the request parameters
    const colabSpaceId = req.params.colabSpaceId;

    // Delete the document with the specified ID from the "colab-spaces" collection
    db.collection("colab-spaces")
        .doc(colabSpaceId)
        .delete()
        .then(() => {
            res.json({ message: "Colab-space deleted successfully" });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "Something went wrong" });
        });
};



// Add a participant to a colab-space
exports.addParticipant = (req, res) => {
    // Get the colab-space ID from the request parameters
    const colabSpaceId = req.params.id;

    // Get the participant data from the request body
    const newParticipant = req.body;

    // Add the participant to the "participants" array in the colab-space document
    db.collection("colab-spaces")
        .doc(colabSpaceId)
        .update({
            participants: admin.firestore.FieldValue.arrayUnion(newParticipant)
        })
        .then(() => {
            res.json({ message: "Participant added successfully" });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "Something went wrong" });
        });
};

// Remove a participant from a colab-space
exports.removeParticipant = (req, res) => {
    // Get the colab-space ID from the request parameters
    const colabSpaceId = req.params.id;

    // Get the participant ID from the request body
    const participantId = req.body.participantId;

    // Remove the participant from the "participants" array in the colab-space document
    db.collection("colab-spaces")
        .doc(colabSpaceId)
        .update({
            participants: admin.firestore.FieldValue.arrayRemove(participantId)
        })
        .then(() => {
            res.json({ message: "Participant removed successfully" });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "Something went wrong" });
        });
};