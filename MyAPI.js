var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

app.listen(3000, function () {
    console.log("Server is running ...");
})


// const { db } = require('./conffig/admin')
const {db} = require('./conffig/admin') 

app.get('/za', function (req, res) {
    res.send('Hello World');
})
let maxId = -1
const CRef = db.collection('Data');
CRef.get().then((snapshot) => {
    const Items = snapshot.docs.map((doc) => (
        {
            id: doc.id,
            ...doc.data()

        }
    ))
    console.log(Items);
    let arr = Items;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].id > maxId) {
            maxId = arr[i].id;
        }
    }
    console.log('maxID: ' + maxId);
})


//getall
app.get("/get", async (req, res) => {
    const cRef = db.collection('Data');
    try {
        cRef.get().then((snapshot) => {
            const items = snapshot.docs.map((doc) => (
                {
                    id: doc.id,
                    ...doc.data()
                }
            ))
            console.log(items);
            res.status(201).json(items);
        })
    } catch (error) {
        res.status(500).json({ message: error });
    }
    // res.status(201).json(items);
})

//getbyId
app.get("/get/:id", async (req, res) => {
    const id = req.params.id;
    const document = db.collection('Data').doc(id);
    try {
        const user = await document.get();
        const response = user.data();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: "Error getting user" });
    }
})

let id = 0;
app.post('/post', async (req, res) => {
    console.log(id);
    req.body.id = id;
    const data = req.body;
    const docRef = db.collection('Data').doc(`${id}`);
    docRef.set(data)
        .then(() => {
            console.log('Tài liệu đã được tạo thành công!');
        })
        .catch((error) => {
            console.error('Lỗi khi tạo tài liệu: ', error);
        });
    res.send('add successfully')
    id++;
});
app.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const documentRef = db.collection('Data').doc(id);
        documentRef.delete();
        res.send('delete successfully')
    } catch (error) {
        console.error('Error deleting document', error);
    }
});

app.put('/update/:id', async (req, res) => {
    const id = req.params.id;
    const document = db.collection('Data').doc(id);
    const dataToUpdate = req.body;
    try {
        await document.update(dataToUpdate);
        res.send(`Document ${id} has been updated successfully.`);
    } catch (error) {
        console.error('Error updating document', error);
    }
});