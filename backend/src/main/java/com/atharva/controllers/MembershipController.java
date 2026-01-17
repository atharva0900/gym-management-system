package com.atharva.controllers;

import com.atharva.models.Membership;
import com.atharva.services.MembershipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/memberships")
@CrossOrigin("*")
public class MembershipController {

    @Autowired
    MembershipService membershipService;

    // ✅ Customer adds membership
    @PostMapping("add-membership")
    public ResponseEntity<?> addMembership(@RequestBody Membership membership) {
        return membershipService.addMembership(membership);
    }

    // ✅ Customer views membership
    @GetMapping("/{id}")
    public ResponseEntity<?> getMembershipById(@PathVariable Long id) {
        return membershipService.getMembershipById(id);
    }

    // ✅ Admin updates membership status
    @PatchMapping("/{id}/status")
    public ResponseEntity<?> updateMembershipStatus(
            @PathVariable Long id,
            @RequestParam String status) {
        return membershipService.updateMembershipStatus(id, status);
    }

    // ✅ Admin gets all memberships
    @GetMapping("/all")
    public ResponseEntity<?> getAllMemberships() {
        return membershipService.getAllMemberships();
    }
    
 // ✅ Delete Membership
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMembership(@PathVariable Long id) {
        return membershipService.deleteMembership(id);
    }
}
