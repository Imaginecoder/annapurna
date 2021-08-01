package application.rest.v1;

import com.cloudant.client.api.CloudantClient;
import io.swagger.v3.oas.annotations.Operation;

import io.swagger.v3.oas.annotations.media.Content;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ResponseBody;
import java.util.ArrayList;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/v1")
public class Example {

    @Autowired
    private CloudantClient client;

    @GetMapping
    @Operation(summary = "Get status of application")
    @ApiResponses(
            value = {
                @ApiResponse(
                        responseCode = "200",
                        description = "Confirmation message that application is running",
                        content = @Content(mediaType = "text/plain"))
            }
    )
    public @ResponseBody
    ResponseEntity<String> example() {
        List<String> list = new ArrayList<>();
        try {
            list = client.getAllDbs();
            return new ResponseEntity<String>(list.toString(), HttpStatus.OK);
        } catch (NullPointerException e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        }

    }

}
