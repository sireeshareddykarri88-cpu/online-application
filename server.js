import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

/* =========================
   SUPABASE CONNECTION
========================= */

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

/* =========================
   HOME ROUTE
========================= */

app.get("/", (req, res) => {
  res.send("Server Running Successfully");
});

/* =========================
   REGISTER ROUTE
========================= */

app.post("/register", async (req, res) => {

  try {

    const {
      name,
      email,
      password,
      age,
      qualification,
      father_name,
      mother_name,
      phone,
      address,
      gender
    } = req.body;

    const { data, error } = await supabase
      .from("applications")
      .insert([
        {
          name,
          email,
          password,
          age,
          qualification,
          father_name,
          mother_name,
          phone,
          address,
          gender
        }
      ]);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    res.status(200).json({
      success: true,
      message: "Application Registered Successfully",
      data
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });

  }

});

/* =========================
   PORT
========================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
