package application.model;

import io.swagger.v3.oas.annotations.media.Schema;
import java.io.Serializable;
import lombok.Data;

/**
 * @author Constantin DRABO <panda dot constantin at gmail dot com>
 */
@Data
public class Product implements Serializable {

    private String _rev;
    private String _id;
    @Schema(description = "Product code")
    private String productID;
    @Schema(description = "Product type", example = "Cereal")
    private String type;
    @Schema(description = "Product name", example = "Milet")
    private String name;
    @Schema(description = "Description")
    private String description;
    @Schema(description = "A screenshot of the prooduct")
    private String image;
}
