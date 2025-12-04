package trabalho2.auth.util;

public record TokenResponse(
        String token,
        Long idUsuario,
        String nome,
        String role
) {
}
