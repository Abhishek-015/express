const express = require("express");
const mongoose = require("mongoose")

const connect = () => {
    return mongoose.connect("mongodb://127.0.0.1:27017/library")
}
// user,Sections,books,authors,checkout
// step 1: create the user schema
const userSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: false },
    email: { type: String, required: true }
})
// step 2: connect the user schema to the user collection
const User = mongoose.model("users", userSchema); //users

// step 1: create the sections schema

const sectionSchema = new mongoose.Schema({
    title: { type: String, required: true },

    userid: [{ type: mongoose.Schema.Types.ObjectId, ref: "users", required: true }]
    // tags:[{type:mongoose.Schema.Types.ObjectId,ref:"tag",required:true}]
},
    {
        versionKey: false, //stop _v
        timestamps: true    // createdAt,updatedAt
    }
)
// step 2: connect the section schema to the section collection

const Section = mongoose.model("sections", sectionSchema) //posts

//step 1: create the books schema

const booksSchema = new mongoose.Schema({
    name: { type: String, required: true },
    body:{type:String,required:true},
    sectionid: { type: mongoose.Schema.Types.ObjectId, ref: "sections", required: true },
    authorid:[{type:mongoose.Schema.Types.ObjectId,ref:"authors",required:true}],
    checkoutid:{type:mongoose.Schema.Types.ObjectId,ref:"checkouts",required:false}
}, {
    versionKey: false,
    timestamps: true
})

// step 2: connect the books schema to the books collection

const Book = mongoose.model("books", booksSchema);

// step 1: create the author schema

const authorSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true }


}, {
    versionKey: false,
    timestamps: true
})
// step 2: connect the author schema to the author collection
const Author = mongoose.model("authors", authorSchema);

// step 1:- create a check out schema

const checkoutSchema =new mongoose.Schema({
        name:{type:String,required:true},
        bookid:[{type:mongoose.Schema.Types.ObjectId,ref:"books",required:true}]
}, {
    versionKey: false,
    timestamps: true
})

// step 2:-connect the checkout schema tp checkout collectio

const Checkout = mongoose.model("checkouts", checkoutSchema);

const app = express();
app.use(express.json())




// -------------CRUD API for users---------------
// post :- create a user
app.post("/user", async (req, res) => {
    const users = await User.create(req.body)    //worked same as db.users.insert() did
    return res.status(201).send({ users });
})

//db.collections.update(query,update,options)
//get :- get all the users

app.get("/user", async (req, res) => {
    const user = await User.find().sort({ id: -1 }).lean().exec();;   // same as db.users.find()
    return res.status(200).send({ user })
})

//patch :- update the user

app.patch("/user/:id", async (req, res) => {
    const users = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).lean().exec() // db.users.update({_id:""},{$set:{}})
    return res.status(200).send(users)
})

//delete :- delete a single user

app.delete("/user/:id", async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id).lean().exec()   //db.users.remove({_id:""},{$set;{}})
    return res.send(user)
})
// get a single user only

app.get("/user/:id", async (req, res) => {
    const user = await User.findById(req.params.id).lean().exec()
    return res.status(200).send({ user })
})




//--------------CRUD API for sections--------------------

app.post("/sections", async (req, res) => {
    const section = await Section.create(req.body);
    return res.status(201).send({ section })
})

app.get("/sections", async (req, res) => {
    const section = await Section.find().lean().exec();
    return res.status(200).send({ section })
})

// getting a single detail

app.get("/sections/:id", async (req, res) => {
    const section =await Section.findById(req.params.id).lean().exec();
    return res.status(200).send({ section });
})

app.patch("/sections/:id", async (req, res) => {
    const section =await Section.findByIdAndUpdate(req.params.id, req.body, { new: true }).lean().exec();
    return res.status(200).send({ section });
})

app.delete("/sections/:id", async (req, res) => {
    const section =await Section.findByIdAndDelete(req.params.id).lean().exec();
    return res.status(200).send({ section })
})

// ----------------CRUD api for books---------------

app.post("/books", async (req, res) => {
    const books = await Book.create(req.body)
    return res.status(201).send({ books })
})

app.get("/books", async (req, res) => {
    const books = await Book.find().lean().exec();
    return res.status(200).send({ books })
})

// getting a single detail

app.get("/books/:id", async (req, res) => {
    const books = await Book.findById(req.params.id).lean().exec();
    return res.status(200).send({ books });
})

app.patch("/books/:id", async (req, res) => {
    const books = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true }).lean().exec();
    return res.status(200).send({ books });
})

app.delete("/books/:id", async (req, res) => {
    const books = await Book.findByIdAndDelete(req.params.id).lean().exec();
    return res.status(200).send({ books })
})

// get all books in a section

app.get("/sections/:id/books",async (req,res)=>{
    const books=await Book.find({sectionid:req.params.id}).populate("sectionid").lean().exec();
    const section=await Section.findById(req.params.id).lean().exec();
    return res.status(200).send({books,section})
})

// get all books written by particular author

app.get("/authors/:id/books",async (req,res)=>{
    const books=await Book.find({authorid:req.params.id}).populate("sectionid").lean().exec();
    const author=await Author.findById(req.params.id).lean().exec();
    return res.status(200).send({books,author})
})

//get all books that are not checked out
app.get("/checkouts/:id/books",async (req,res)=>{
    const books=await Book.find({checkoutid:{$ne:req.params.id}}).lean().exec();
    return res.status(200).send(books.map(item=>item.name+" : "+item.body))
})

//-------------------CRUD api for authors-----------------

app.post("/authors", async (req, res) => {
    const author = await Author.create(req.body);
    return res.status(201).send({ author })
})

app.get("/authors", async (req, res) => {
    const author = await Author.find().lean().exec();
    return res.status(200).send({ author })
})

// getting a single detail

app.get("/authors/:id", async (req, res) => {
    const author = await Author.findById(req.params.id).lean().exec();
    return res.status(200).send({ author });
})

app.patch("/authors/:id", async (req, res) => {
    const author = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true }).lean().exec();
    return res.status(200).send({ author });
})

app.delete("/authors/:id", async (req, res) => {
    const author = await Author.findByIdAndDelete(req.params.id).lean().exec();
    return res.status(200).send({ author })
})

//-------------CRUD api for checkout------------------

app.post("/checkouts", async (req, res) => {
    const checkout = await Checkout.create(req.body);
    return res.status(201).send({ checkout })
})

app.get("/checkouts", async (req, res) => {
    const checkout = await Checkout.find().populate({path:"bookid",select:"name body"}).lean().exec();
    return res.status(200).send(checkout)
})

// getting a single detail

app.get("/checkouts/:id", async (req, res) => {
    const checkout = await Checkout.findById(req.params.id).lean().exec();
    return res.status(200).send(checkout);
})

app.patch("/checkouts/:id", async (req, res) => {
    const checkout = await Checkout.findByIdAndUpdate(req.params.id, req.body, { new: true }).lean().exec();
    return res.status(200).send({ checkout });
})

app.delete("/checkouts/:id", async (req, res) => {
    const checkout = await Checkout.findByIdAndDelete(req.params.id).lean().exec();
    return res.status(200).send({ checkout })
})


app.listen("3000", async function () {
    await connect();
    console.log("Listening at port 3000");
})