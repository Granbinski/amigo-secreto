package com.amigosecreto.controller;

import com.amigosecreto.model.Amigo;
import com.amigosecreto.service.AmigoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/amigos")
public class AmigoController {

    private final AmigoService amigoService;

    @Autowired
    public AmigoController(AmigoService amigoService) {
        this.amigoService = amigoService;
    }

    @GetMapping
    public ResponseEntity<List<Amigo>> listarTodos() {
        return ResponseEntity.ok(amigoService.listarTodos());
    }

    @PostMapping
    public ResponseEntity<Amigo> adicionar(@RequestBody Amigo amigo) {
        try {
            Amigo novoAmigo = amigoService.adicionar(amigo);
            return ResponseEntity.status(HttpStatus.CREATED).body(novoAmigo);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/sortear")
    public ResponseEntity<Amigo> sortear() {
        try {
            Amigo amigo = amigoService.sortear();
            return ResponseEntity.ok(amigo);
        } catch (IllegalStateException e) {
            return ResponseEntity.noContent().build();
        }
    }

    @DeleteMapping
    public ResponseEntity<Void> limpar() {
        amigoService.limpar();
        return ResponseEntity.noContent().build();
    }
}