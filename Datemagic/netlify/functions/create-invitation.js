
exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const { recipient_name, message, theme } = JSON.parse(event.body || "{}");

    if (
      typeof recipient_name !== "string" ||
      typeof message !== "string" ||
      !recipient_name.trim() ||
      !message.trim() ||
      recipient_name.length > 100 ||
      message.length > 2000 ||
      !["pink", "night", "cute"].includes(theme)
    ) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Проверь имя, текст и оформление" }),
      };
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Server environment is not configured");
    }

    const slug = crypto.randomUUID().replace(/-/g, "").slice(0, 12);

    const response = await fetch(`${supabaseUrl}/rest/v1/invitations`, {
      method: "POST",
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        slug,
        recipient_name: recipient_name.trim(),
        message: message.trim(),
        theme,
      }),
    });

    if (!response.ok) {
      console.error("Supabase request failed:", response.status);
      return {
        statusCode: 502,
        body: JSON.stringify({ error: "Не удалось сохранить приглашение" }),
      };
    }

    return {
      statusCode: 201,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug,
        url: `/i/${slug}`,
      }),
    };
  } catch (error) {
    console.error("Create invitation failed:", error.message);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Внутренняя ошибка сервера" }),
    };
  }
};
