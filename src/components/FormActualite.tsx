"use client";
import React, { useState } from "react";
import { z } from "zod";

// Définition du schéma Zod adapté à EventsSchema de Mongoose
const eventSchema = z.object({
  id: z.coerce.number().min(1, "ID requis"),
  title: z.string().min(1, "Titre requis"),
  place: z.string().min(1, "Lieu requis"),
  theme: z.string().min(1, "Thème requis"),
  isFree: z.boolean(),
  date: z.string().min(1, "Date requise"),
  time: z.string().min(1, "Heure requise"),
  description: z.string().min(1, "Description requise"),
  image: z.string().min(1, "Image requise").startsWith("/images/", "Doit commencer par /images/")
});

type EventFormData = z.infer<typeof eventSchema>;
type FormErrors = { [K in keyof EventFormData]?: string };

const EventForm: React.FC = () => {
  const [formData, setFormData] = useState<EventFormData|any>({
    // id: 1,
    title: "",
    place: "",
    theme: "",
    isFree: true,
    date: new Date().toISOString().split("T")[0],
    time: "12:00",
    description: "",
    image: ""
  });
  console.log("formData", formData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validateForm = (): FormErrors => {
    try {
      eventSchema.parse(formData);
      return {};
    } catch (error) {
      const formattedErrors: FormErrors = {};
      if (error instanceof z.ZodError) {
        error.errors.forEach(err => {
          const path = err.path[0] as keyof EventFormData;
          formattedErrors[path] = err.message;
        });
      }
      return formattedErrors;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked  } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };
  console.log("formData", formData.title);
  const event  = {
    title:formData.title,
    place: formData.place,
    theme: formData.theme,
    isFree: formData.isFree,
    time: formData.time,
    description: formData.description,
    image: "/images/nom-de-limage.jpg"
  };
  const sendToServer = async (data: EventFormData) => {
    try {
      const response = await fetch("http://localhost:3001/api/events", {
        method: "POST",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error("Échec de l'envoi des données");
      }
  
      const result = await response.json();
      console.log("Réponse du serveur :", result);
      return result;
    } catch (error) {
      console.error("Erreur lors de l'envoi :", error);
    }
  };
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    // const formErrors = validateForm();
    // if (Object.keys(formErrors).length === 0) {
      console.log("Envoi au serveur :", formData);
      await sendToServer(event as any);
      setSubmitted(true);
      setErrors({});
    // } else {
    //   setErrors(formErrors);
    // }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Créer un événement</h2>

      {submitted && (
        <div className="bg-green-100 p-4 rounded mb-4 text-green-700">
          Événement ajouté avec succès !
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Champ ID
        <input type="hidden" name="id" value={formData.id} /> */}

        {/* Titre */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Titre</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
        </div>

        {/* Lieu */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Lieu</label>
          <input
            type="text"
            name="place"
            value={formData.place}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded ${errors.place ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.place && <p className="text-red-500 text-sm">{errors.place}</p>}
        </div>

        {/* Thème */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Thème</label>
          <input
            type="text"
            name="theme"
            value={formData.theme}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded ${errors.theme ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.theme && <p className="text-red-500 text-sm">{errors.theme}</p>}
        </div>

        {/* Gratuité */}
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            name="isFree"
            checked={formData.isFree}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="font-semibold">Événement gratuit ?</label>
        </div>

        {/* Date */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded ${errors.date ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
        </div>

        {/* Heure */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Heure</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded ${errors.time ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.time && <p className="text-red-500 text-sm">{errors.time}</p>}
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className={`w-full px-3 py-2 border rounded ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
          ></textarea>
          {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
        </div>

        {/* Image */}
        <div className="mb-6">
          <label className="block font-semibold mb-1">URL de l'image</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="/images/nom-de-limage.jpg"
            className={`w-full px-3 py-2 border rounded ${errors.image ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
        </div>

        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Ajouter l'événement
        </button>
      </form>
    </div>
  );
};

export default EventForm;
