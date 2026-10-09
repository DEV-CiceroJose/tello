export function describeGoogleSignInError(error, hostname = "") {
  switch (error?.code) {
    case "auth/popup-closed-by-user":
    case "auth/cancelled-popup-request":
      return null;
    case "auth/unauthorized-domain":
      return `O endereço ${hostname || "deste site"} ainda não está autorizado para entrar com Google. Avise o responsável pelo site.`;
    case "auth/operation-not-allowed":
      return "O login com Google ainda não está habilitado neste site. Avise o responsável pelo site.";
    case "auth/popup-blocked":
      return "O navegador bloqueou a janela do Google. Permita popups para este site e tente novamente.";
    case "auth/network-request-failed":
      return "Não foi possível acessar o Google. Confira sua conexão e tente novamente.";
    case "permission-denied":
      return "A conta Google foi conectada, mas não foi possível carregar seus dados. Avise o responsável pelo site.";
    default:
      return "Não foi possível entrar com Google. Tente novamente em instantes.";
  }
}
