package application.model;

import java.io.Serializable;
import lombok.Data;

/**
 * Model for actor type.
 *
 * @author Constantin DRABO <panda dot constantin at gmail dot com>
 */
@Data
public class ActorType implements Serializable {

    private String _rev;
    private String _id;
    private Long actorTypeCode;
    private String name;
}
