package application.model;

import java.io.Serializable;
import lombok.Data;

/**
 * @author Constantin DRABO <panda dot constantin at gmail dot com>
 */
@Data
public class Actor implements Serializable {

    private String _rev;
    private String _id;
    private String actorID;
    private String fullName;
    private String address;
    private String phoneNumber;
    private String city;
    private String country;
    /**
     * Define if an actor is Producer or Customer.
     */
    private boolean producer;
    /**
     * Definne the type of actor. (Farmer, customer)
     */
    private String actorType;

}
