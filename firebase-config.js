/* =========================================================================
   ملف إعدادات المتجر المشترك (Firebase + Supabase Storage)
   يُستخدم في الموقع الرئيسي (index.html) وفي لوحة التحكم (admin.html)
   ========================================================================= */

const firebaseConfig = {
  apiKey: "AIzaSyAgzYyARn-thNypPyYsOlVEP3tliTzQQcU",
  authDomain: "rtg-gearx.firebaseapp.com",
  projectId: "rtg-gearx",
  storageBucket: "rtg-gearx.firebasestorage.app",
  messagingSenderId: "82142983055",
  appId: "1:82142983055:web:2bb738cc9911d14533d1fa"
};

// 1. تهيئة Firebase (لقاعدة البيانات والمستخدمين)
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

// لم نعد بحاجة لـ firebase.storage() لأننا استبدلناه بالبديل المجاني 100%

// 2. إعدادات منصة Supabase المجانية لرفع الصور (تم ملؤها ببياناتك الحقيقية تلقائياً)
// ⚠️ هام جداً: هنا يوضع فقط المفتاح العام (publishable/anon) ولا يوضع أبداً المفتاح السري (secret/service_role)
// لأن أي شخص يفتح كود الموقع (View Source) سيراه، والمفتاح السري يعطي صلاحية كاملة غير محدودة على حسابك.
const SUPABASE_URL = "https://kljjxmfdyjfyddqlzrkd.supabase.co"; 
const SUPABASE_ANON_KEY = "sb_publishable_zKM2mcIET3C4TxkjqJ4GWA_nU-TbgjM";
const SUPABASE_BUCKET = "products"; // اسم المخزن (Bucket) الذي أنشأته في Supabase Storage

// تصدير الإعدادات للذاكرة العامة لتراها لوحة التحكم (admin.html) عند رفع الصور
window.supabaseUrl = SUPABASE_URL;
window.supabaseKey = SUPABASE_ANON_KEY;
window.supabaseBucket = SUPABASE_BUCKET;

// علم عام يخبر باقي الكود إن كانت الإعدادات لا تزال فارغة
const FIREBASE_CONFIGURED = !Object.values(firebaseConfig).some(v => String(v).startsWith('ضع_'));