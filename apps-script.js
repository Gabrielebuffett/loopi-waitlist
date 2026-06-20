function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  var email = data.email;

  sheet.appendRow([new Date(), email]);

  var html = "<!DOCTYPE html><html><head><meta charset='utf-8'></head>"
    + "<body style='margin:0;padding:0;background-color:#f0f0f4;font-family:Inter,Helvetica,Arial,sans-serif;'>"
    + "<table width='100%' cellpadding='0' cellspacing='0' style='background-color:#f0f0f4;padding:40px 20px;'>"
    + "<tr><td align='center'>"
    + "<table width='520' cellpadding='0' cellspacing='0' style='background-color:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);'>"
    + "<tr><td style='background:linear-gradient(135deg,#9B6FC0,#7E57A0,#6B4589);padding:48px 40px;text-align:center;'>"
    + "<img src='https://gabrielebuffett.github.io/loopi-waitlist/logo.svg' alt='Loopi' width='140' style='margin-bottom:16px;filter:brightness(0) invert(1);'>"
    + "<p style='margin:0;font-size:14px;color:rgba(255,255,255,0.7);font-style:italic;'>Make habit reality.</p>"
    + "</td></tr>"
    + "<tr><td style='padding:40px;'>"
    + "<p style='margin:0 0 20px;font-size:16px;font-weight:700;color:#1a1a1a;'>You are on the list.</p>"
    + "<p style='margin:0 0 16px;font-size:14px;color:#666;line-height:1.8;'>Thank you for joining the Loopi Smart Glasses waitlist. You are now among the first people who will experience the future of wearable technology.</p>"
    + "<p style='margin:0 0 28px;font-size:14px;color:#666;line-height:1.8;'>We are working hard to bring you smart glasses that blend cutting-edge AI with iconic style. We will keep you updated and let you know as soon as early access is available.</p>"
    + "<table width='100%' cellpadding='0' cellspacing='0' style='background-color:#f8f8fa;border-radius:14px;margin-bottom:28px;'>"
    + "<tr><td style='padding:24px;'>"
    + "<p style='margin:0 0 14px;font-size:13px;font-weight:700;color:#1a1a1a;text-transform:uppercase;letter-spacing:1.5px;'>What to expect</p>"
    + "<p style='margin:0;padding:6px 0;font-size:14px;color:#888;line-height:1.8;'>&#10003; Early access before public launch</p>"
    + "<p style='margin:0;padding:6px 0;font-size:14px;color:#888;line-height:1.8;'>&#10003; Exclusive updates on features and design</p>"
    + "<p style='margin:0;padding:6px 0;font-size:14px;color:#888;line-height:1.8;'>&#10003; Special pricing for waitlist members</p>"
    + "</td></tr></table>"
    + "<table width='100%' cellpadding='0' cellspacing='0'><tr><td align='center'>"
    + "<a href='https://lisia.io' style='display:inline-block;background:linear-gradient(135deg,#9B6FC0,#7E57A0);color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:12px;font-size:14px;font-weight:600;'>Visit Lisia.io</a>"
    + "</td></tr></table>"
    + "</td></tr>"
    + "<tr><td style='padding:24px 40px 32px;text-align:center;border-top:1px solid #f0f0f0;'>"
    + "<p style='margin:0 0 16px;font-size:12px;color:#bbb;'>Follow us</p>"
    + "<p style='margin:0;font-size:11px;color:#ccc;'>2026 Loopi Inc. All rights reserved.</p>"
    + "</td></tr>"
    + "</table></td></tr></table></body></html>";

  UrlFetchApp.fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": "Bearer re_iNEQaGPp_5srHuraLAf4XjKw1c1GHCUAu",
      "Content-Type": "application/json"
    },
    payload: JSON.stringify({
      from: "Loopi <loopi@lisia.io>",
      to: email,
      subject: "Welcome to Loopi",
      html: html
    })
  });

  return ContentService.createTextOutput(JSON.stringify({result: "success"}))
    .setMimeType(ContentService.MimeType.JSON);
}
