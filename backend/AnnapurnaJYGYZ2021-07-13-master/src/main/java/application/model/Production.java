package application.model;

import io.swagger.v3.oas.annotations.media.Schema;
import java.io.Serializable;
import java.time.LocalDate;
import lombok.Data;

/**
 * This model aims to represent information of the production of a producer.
 * @author Constantin DRABO <panda dot constantin at gmail dot com>
 */
@Data
public class Production implements Serializable {

    @Schema(description = "Version of the data")
    private String _rev;
    @Schema(description = "Identity of the data")
    private String _id;
    @Schema(description = "Quantity of product produced")
    private float quantity;
    @Schema(description = "Date when the product is available", example = "5.7kg or 5 plates, etc.")
    private LocalDate availabilityDate;
    @Schema(description = "Product available")
    private Product product;
    @Schema(description = "The place where they store the product")
    private Storage storage;
    @Schema(description = "Information of the actor", example = "Farmer")
    private Actor actor;

}
