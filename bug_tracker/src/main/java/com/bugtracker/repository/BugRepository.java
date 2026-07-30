package com.bugtracker.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bugtracker.enums.Priority;
import com.bugtracker.enums.Status;
import com.bugtracker.model.Bug;
import com.bugtracker.model.User;

public interface BugRepository extends JpaRepository<Bug, Long> {

	List<Bug> findByStatus(Status status);

	List<Bug> findByPriority(Priority priority);

	List<Bug> findByAssignedUser(User user);

	Long countByStatus(Status open);

	Long countByPriority(Priority high);

	List<Bug> findByCreatedBy(User user);

}
