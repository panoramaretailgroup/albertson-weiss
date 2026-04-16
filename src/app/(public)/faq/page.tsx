import type { Metadata } from "next";
import { FAQSchema } from "@/components/JsonLd";
import FAQContent from "./_content";

export const metadata: Metadata = {
  title: "Preguntas frecuentes",
  description:
    "Resuelve tus dudas sobre inversión en vehículos premium: contratos, rentabilidad, proceso, legalidad y más.",
};

const faqItems = [
  { question: "¿Qué es Albertson & Weiss Motors?", answer: "Albertson & Weiss Motors es una plataforma de inversión en vehículos premium. Adquirimos coches en subastas americanas, los importamos a Europa y los vendemos obteniendo un beneficio." },
  { question: "¿Cómo funciona la inversión?", answer: "Seleccionamos un vehículo premium, publicamos la oportunidad, tú inviertes formalizando un contrato de préstamo privado, nosotros gestionamos toda la logística, y al venderse recuperas tu inversión más la rentabilidad pactada." },
  { question: "¿Cuál es la inversión mínima?", answer: "La inversión mínima varía según la operación, generalmente entre 5.000€ y 10.000€." },
  { question: "¿Qué tipo de contrato se firma?", answer: "Se firma un contrato de préstamo privado bilateral, regulado por los artículos 1740 a 1757 del Código Civil español." },
  { question: "¿Está regulado legalmente?", answer: "Sí. Los contratos de préstamo privado entre particulares son completamente legales en España y están regulados por el Código Civil." },
  { question: "¿Qué pasa si el vehículo tarda más en venderse?", answer: "Tu inversión sigue protegida por el valor del activo. La rentabilidad se calcula en función del tiempo real de la operación." },
  { question: "¿Cómo puedo hacer seguimiento de mi inversión?", answer: "A través de tu panel de inversor puedes seguir en tiempo real cada fase de la operación." },
  { question: "¿Puedo invertir desde fuera de España?", answer: "Sí, aceptamos inversores con residencia fiscal en cualquier país de la Unión Europea." },
];

export default function FAQPage() {
  return (
    <>
      <FAQSchema items={faqItems} />
      <FAQContent />
    </>
  );
}
