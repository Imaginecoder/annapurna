package application.model;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

/**
 * @author Constantin DRABO <panda dot constantin at gmail dot com>
 */
@Data
public class Storage {

    private String _rev;
    private String _id;
    @Schema(description = "Storage localization coordinate")
    private String storageLocation;
    @Schema(description = "Address of the storage")
    private String address;
    @Schema(description = "The identifiant of the prooducer")
    private String producerCode;
}
