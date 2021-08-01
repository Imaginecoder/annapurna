/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package application.controller;

import application.model.Actor;
import application.model.ActorType;
import application.model.Product;
import application.model.Storage;
import application.service.AnnapurnaService;
import com.cloudant.client.api.model.Response;
import io.swagger.v3.oas.annotations.Operation;
import java.io.Serializable;
import java.util.List;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author Constantin DRABO <panda dot constantin at gmail dot com>
 * @since 17 juil. 2021
 * @version 1.0
 */
@RestController
@RequestMapping("/annapurna")
@RequiredArgsConstructor
public class AnnapurnnaController implements Serializable {

    private final AnnapurnaService annapurnaClientService;

    @GetMapping(path = "/actor")
    @Operation(summary = "Retrieve the list of actors", tags = "Actor")
    public @ResponseBody
    ResponseEntity<List<Actor>> getActors() {
        return new ResponseEntity<>(annapurnaClientService.doGetActorsList(), HttpStatus.OK);
    }

    @PostMapping(path = "/actor")
    @Operation(summary = "Create a new actor", tags = "Actor")
    public @ResponseBody
    ResponseEntity<Response> createActor(@RequestBody final Actor actor) {
        return new ResponseEntity<>(annapurnaClientService.doCreateActor(actor), HttpStatus.CREATED);
    }

    @PutMapping(path = "/actor/{id}")
    @Operation(summary = "Update an actor", tags = "Actor")
    public @ResponseBody ResponseEntity<Response> updateActor(@PathVariable @Valid final String id ,
            @RequestBody final Actor actorPayload) {
        return new ResponseEntity<>(annapurnaClientService.doUpdateActor(id, actorPayload), HttpStatus.CREATED);
    }

    @DeleteMapping(path = "/actor/{id}")
    @Operation(summary = "Delete an actor", tags = "Actor")
    public @ResponseBody ResponseEntity<Response> deleteActor(@PathVariable final String id) {
        return new ResponseEntity<>(annapurnaClientService.doDeleteActor(id), HttpStatus.CREATED);
    }

    @GetMapping(path = "/actortype")
    @Operation(summary = "Retrieve the list of actor types", tags = "Actor type")
    public ResponseEntity<List<ActorType>> getActorTypes() {
        return new ResponseEntity<>(annapurnaClientService.doGetActorTypesList(), HttpStatus.OK);
    }

    @PostMapping(path = "/actortype")
    @Operation(summary = "Create a new actor type", tags = "Actor type")
    public @ResponseBody ResponseEntity<Response> createActorType(@RequestBody final ActorType actorType) {
        return new ResponseEntity<>(annapurnaClientService.doCreateActortype(actorType), HttpStatus.CREATED);
    }

    @PostMapping(path = "/product")
    @Operation(summary = "Create a new product", tags = "Product")
    public @ResponseBody ResponseEntity<Response> createProduct(@RequestBody final Product product) {
        return new ResponseEntity<>(annapurnaClientService.doCreateProduct(product), HttpStatus.CREATED);
    }

    @PutMapping(path = "/product/{id}")
    @Operation(summary = "Update a product", tags = "Product")
    public ResponseEntity<Response> updateProduct(@PathVariable final String id, @RequestBody final Product productPayload) {
        return new ResponseEntity<>(annapurnaClientService.doUpdateProduct(id, productPayload), HttpStatus.CREATED);
    }

    @DeleteMapping(path = "/product/{id}")
    @Operation(summary = "Delete a specific product", tags = "Product")
    public ResponseEntity<Response> deleteProduct(final String id) {
        return new ResponseEntity<>(annapurnaClientService.doDeleteProduct(id), HttpStatus.CREATED);
    }

    @GetMapping(path = "/product")
    @Operation(summary = "Get the list of products", tags = "Product")
    public ResponseEntity<List<Product>> getProducts() {
        return new ResponseEntity<>(annapurnaClientService.doGetProductsList(), HttpStatus.OK);
    }

    @PostMapping(path = "/storage")
    @Operation(summary = "Create a new storage", tags = "Storage")
    public @ResponseBody ResponseEntity<Response> createStorage(@RequestBody final Storage storage) {
        return new ResponseEntity<>(annapurnaClientService.doCreateStorage(storage), HttpStatus.CREATED);
    }

    @PutMapping(path = "/storage/{id}")
    @Operation(summary = "Update a storage", tags = "Storage")
    public ResponseEntity<Response> updateStorage(@PathVariable final String id, @RequestBody final Storage storagePayload) {
        return new ResponseEntity<>(annapurnaClientService.doUpdateStorage(id, storagePayload), HttpStatus.CREATED);
    }

    @DeleteMapping(path = "/storage/{id}")
    @Operation(summary = "Delete a specific storage", tags = "Storage")
    public ResponseEntity<Response> deleteStorage(final String id) {
        return new ResponseEntity<>(annapurnaClientService.doDeleteStorage(id), HttpStatus.CREATED);
    }

    @GetMapping(path = "/storage")
    @Operation(summary = "Get the list of products", tags = "Storage")
    public ResponseEntity<List<Storage>> getStorages() {
        return new ResponseEntity<>(annapurnaClientService.doGetStoragesList(), HttpStatus.OK);
    }
}
