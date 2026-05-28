# SKILL: copado-hx

## Purpose

copado-hx is a headless DevOps CLI for Salesforce and Copado workflows.

It enables AI agents and developers to:

* validate deployments
* execute CRT tests
* deploy metadata
* manage release workflows
* orchestrate pipelines

---

# Authentication

copado-hx auth login --url <url> --token <token>

---

# Story Workflow

copado-hx story list
copado-hx story set --id <story-id>
copado-hx story show

---

# Validation

copado-hx validate -s <story-id> --watch

---

# Testing

copado-hx test jobs
copado-hx test run --job <job-id> --watch

---

# Deployment

copado-hx deploy --env PROD --watch

---

# AI Agents

copado-hx ai ask --agent release "Generate release notes"

Available agents:

* plan
* build
* test
* release
* operate

---

# Pipeline Automation

copado-hx pipeline run

Pipeline stages:

1. Validation
2. Testing
3. Deployment
4. AI Release Notes

---

# Output

All commands provide:

* real-time terminal feedback
* watch mode
* pipeline orchestration
* machine-readable architecture
