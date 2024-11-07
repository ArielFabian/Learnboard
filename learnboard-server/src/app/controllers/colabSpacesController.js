const { db } = require("../util/admin");
const admin = require("firebase-admin");
const { createMeeting } = require("./zoomController");

// Create a new colab-space with email and code
exports.createColabSpace = async (req, res) => {
    const generateRandomCode = () => {
        return Math.floor(100000 + Math.random() * 900000).toString();
    };

    const meetingId = await createMeeting();

    const newColabSpace = {
        name: req.body.name,
        email: req.body.email, // Add email
        code: generateRandomCode(), // Generate a 6-digit random code
        date: new Date().toISOString(),
        meetingId: meetingId,
    };

    // Add the new colab-space to the "colab-spaces" collection
    db.collection("colab-spaces")
        .add(newColabSpace)
        .then((docRef) => {
            res.json({ message: `Colab-space created with code: ${newColabSpace.code}`,code: newColabSpace.code }); 
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "Something went wrong" });
        });
};

// Get a specific colab-space by code
exports.getColabSpaceByCode = (req, res) => {
    const colabSpaceCode = req.params.code;
    // Get the document with the specified code from the "colab-spaces" collection
    db.collection("colab-spaces")
        .where("code", "==", colabSpaceCode)
        .get()
        .then((snapshot) => {
            if (!snapshot.empty) {
                const doc = snapshot.docs[0]; // Assuming the code is unique
                res.json({ id: doc.id, data: doc.data() });
            } else {
                res.status(404).json({ error: "Colab-space not found" });
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "Something went wrong" });
        });
};

// Add a participant to a colab-space
exports.addParticipant = (req, res) => {
    const colabSpaceCode = req.params.code;
    const newParticipant = {
        name: req.body.name,
        id: req.body.id,
        hasMobile: req.body.hasMobile || false,
        mobile: req.body.mobile || null,
        isActive: false,  // Participant is active by default
    };

    db.collection("colab-spaces")
        .where("code", "==", colabSpaceCode)
        .get()
        .then((snapshot) => {
            if (!snapshot.empty) {
                const docRef = snapshot.docs[0].ref;

                // Add the participant to the participants array
                docRef.update({
                    participants: admin.firestore.FieldValue.arrayUnion(newParticipant)
                })
                .then(() => {
                    res.json({ message: "Participant added successfully" });
                });
            } else {
                res.status(404).json({ error: "Colab-space not found" });
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "Something went wrong" });
        });
};

// Remove a participant from a colab-space
exports.removeParticipant = (req, res) => {
    const colabSpaceCode = req.params.code;
    const participantId = req.body.participantId;

    db.collection("colab-spaces")
        .where("code", "==", colabSpaceCode)
        .get()
        .then((snapshot) => {
            if (!snapshot.empty) {
                const docRef = snapshot.docs[0].ref;

                // Remove the participant from the participants array
                docRef.update({
                    participants: admin.firestore.FieldValue.arrayRemove({ id: participantId })
                })
                .then(() => {
                    res.json({ message: "Participant removed successfully" });
                });
            } else {
                res.status(404).json({ error: "Colab-space not found" });
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "Something went wrong" });
        });
};

// Toggle the 'isActive' field for all participants in a colab-space
exports.toggleIsActiveForParticipants = (req, res) => {
    const colabSpaceCode = req.params.code;

    // Get the colab-space with the specified code
    db.collection("colab-spaces")
        .where("code", "==", colabSpaceCode)
        .get()
        .then((snapshot) => {
            if (!snapshot.empty) {
                const docRef = snapshot.docs[0].ref;
                const colabSpaceData = snapshot.docs[0].data();

                // Toggle 'isActive' field for each participant
                const updatedParticipants = colabSpaceData.participants.map(participant => {
                    participant.isActive = !participant.isActive; // Toggle isActive (true <-> false)
                    return participant;
                });

                // Update the document with the new participants array
                docRef.update({ participants: updatedParticipants })
                    .then(() => {
                        res.json({ message: "'isActive' toggled for all participants" });
                    });
            } else {
                res.status(404).json({ error: "Colab-space not found" });
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "Something went wrong" });
        });
};