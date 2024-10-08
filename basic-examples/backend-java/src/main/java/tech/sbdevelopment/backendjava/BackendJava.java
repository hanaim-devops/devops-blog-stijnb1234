package tech.sbdevelopment.backendjava;

import io.highlight.sdk.Highlight;
import io.highlight.sdk.HighlightSession;
import io.highlight.sdk.common.HighlightOptions;
import io.highlight.sdk.common.Severity;
import org.apache.commons.text.RandomStringGenerator;

public class BackendJava {
    private static final HighlightOptions options = HighlightOptions.builder("0dq8zjqd")
            .serviceName("backend-java")
            .version("1.0.0")
            .environment("development")
            .build();

    private static final RandomStringGenerator generator = new RandomStringGenerator.Builder()
            .withinRange('0', 'z')
            .filteredBy(Character::isLetterOrDigit)
            .get();

    public static void main(String[] args) {
        System.out.println("Hello World from the backend-java module!");

        Highlight.init(options);

        // Random string as session id
        HighlightSession session = new HighlightSession(generator.generate(10));

        try {
            session.captureLog(Severity.INFO, "Let me convert '2' to an integer: " + strToInt("2"));
        } catch (NumberFormatException e) {
            session.captureException(e);
        }
        try {
            session.captureLog(Severity.INFO, "Let me convert '2.5' to an integer: " + strToInt("2.5"));
        } catch (NumberFormatException e) {
            session.captureException(e);
        }
        try {
            session.captureLog(Severity.INFO, "Let me convert 'two' to an integer: " + strToInt("two"));
        } catch (NumberFormatException e) {
            session.captureException(e);
        }
    }

    public static int strToInt(String in) throws NumberFormatException {
        return Integer.parseInt(in);
    }
}
