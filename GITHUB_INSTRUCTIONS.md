# خطوات رفع المشروع على GitHub

بما أنك تريد رفع الملفات بنفسك، لقد قمت بتجهيز ملف `.gitignore` لضمان عدم رفع ملفات غير ضرورية.
اتبع الخطوات التالية بالترتيب في التيرمينال (Terminal):

## 1. إنشاء مستودع جديد (Repository)
اذهب إلى موقع GitHub وأنشئ مستودعاً جديداً (New Repository).
لا تقم بإضافة README أو .gitignore من هناك (لأننا لدينا ملفاتنا بالفعل).

## 2. تهيئة Git محلياً
انسخ والصق هذه الأوامر في التيرمينال داخل مجلد المشروع:

```bash
# تهيئة المستودع
git init

# إضافة جميع الملفات (تجهيزها للحفظ)
git add .

# حفظ الملفات (Commit) مع رسالة توضيحية
git commit -m "First commit: Complete project setup with Memory Storage"
```

## 3. ربط المشروع بـ GitHub ورفع الملفات
استبدل `YOUR_REPO_URL` برابط المستودع الذي أنشأته في الخطوة 1، ثم نفذ:

```bash
# تغيير اسم الفرع الرئيسي إلى main (أفضل ممارسة)
git branch -M main

# ربط المستودع البعيد
git remote add origin YOUR_REPO_URL

# رفع الملفات
git push -u origin main
```
