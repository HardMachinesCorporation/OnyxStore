// src/utils/authErrorMessages.ts

/**
 * Mapping of Supabase Auth error codes to user‑friendly messages.
 */
export const ERROR_MESSAGES: Record<string, string> = {
  anonymous_provider_disabled:
    'Anonymous sign‑ins are disabled.',
  bad_code_verifier:
    'The provided PKCE code verifier does not match the expected one. Indicates a bug in the client implementation.',
  bad_json:
    'The request body is not valid JSON.',
  bad_jwt:
    'The JWT sent in the Authorization header is not valid.',
  bad_oauth_callback:
    'OAuth callback is missing required attributes (e.g. state). Check your OAuth provider or client implementation.',
  bad_oauth_state:
    'OAuth state is malformed or unexpected. Check your OAuth provider integration.',
  captcha_failed:
    'CAPTCHA challenge verification failed. Check your CAPTCHA integration.',
  conflict:
    'Database conflict (e.g. concurrent session refresh). Reduce concurrent requests or implement exponential back‑off.',
  email_address_invalid:
    'The email address domain is not supported. Use a different email address.',
  email_address_not_authorized:
    'Emails can only be sent to members of your Supabase organization. Set up a custom SMTP provider to send to other addresses.',
  email_conflict_identity_not_deletable:
    'Cannot unlink this identity because it would collide with another existing user’s email. You may need to merge accounts manually.',
  email_exists:
    'This email address is already registered.',
  email_not_confirmed:
    'Email address not confirmed. Please check your inbox to confirm.',
  email_provider_disabled:
    'Signups via email and password are disabled.',
  flow_state_expired:
    'PKCE flow state expired. Please sign in again.',
  flow_state_not_found:
    'PKCE flow state not found. Please retry the sign‑in process.',
  hook_payload_invalid_content_type:
    'Invalid Content‑Type header on Auth hook payload.',
  hook_payload_over_size_limit:
    'Auth hook payload exceeds maximum size limit.',
  hook_timeout:
    'Auth hook did not respond in time.',
  hook_timeout_after_retry:
    'Auth hook still unresponsive after retries.',
  identity_already_exists:
    'This identity is already linked to a user.',
  identity_not_found:
    'The specified identity does not exist.',
  insufficient_aal:
    'Higher Authenticator Assurance Level (MFA) required. Prompt the user to complete MFA.',
  invalid_credentials:
    'Invalid login credentials or unsupported grant type.',
  invite_not_found:
    'Invite link is expired or already used.',
  manual_linking_disabled:
    'Linking identities via supabase.auth.linkUser() is not enabled on the server.',
  mfa_challenge_expired:
    'MFA challenge expired. Please request a new one.',
  mfa_factor_name_conflict:
    'An MFA factor with this friendly name already exists.',
  mfa_factor_not_found:
    'The specified MFA factor does not exist.',
  mfa_ip_address_mismatch:
    'MFA enrollment must start and finish from the same IP address.',
  mfa_phone_enroll_not_enabled:
    'Phone-based MFA enrollment is disabled.',
  mfa_phone_verify_not_enabled:
    'Phone-based MFA verification is disabled.',
  mfa_totp_enroll_not_enabled:
    'TOTP MFA enrollment is disabled.',
  mfa_totp_verify_not_enabled:
    'TOTP MFA verification is disabled.',
  mfa_verification_failed:
    'MFA verification failed (incorrect code).',
  mfa_verification_rejected:
    'MFA verification was rejected by the verification hook.',
  mfa_verified_factor_exists:
    'A verified phone factor already exists. Unenroll it before enrolling a new one.',
  mfa_web_authn_enroll_not_enabled:
    'WebAuthn MFA enrollment is disabled.',
  mfa_web_authn_verify_not_enabled:
    'WebAuthn MFA verification is disabled.',
  no_authorization:
    'Authorization header is required.',
  not_admin:
    'Admin privileges required to call this API.',
  oauth_provider_not_supported:
    'The specified OAuth provider is disabled on the server.',
  otp_disabled:
    'OTP‑based sign‑in (magic link / email OTP) is disabled.',
  otp_expired:
    'OTP has expired. Please request a new sign‑in link.',
  over_email_send_rate_limit:
    'Too many emails sent to this address. Please wait before trying again.',
  over_request_rate_limit:
    'Too many requests from this client. Please slow down and try again later.',
  over_sms_send_rate_limit:
    'Too many SMS messages sent to this number. Please wait before trying again.',
  phone_exists:
    'This phone number is already registered.',
  phone_not_confirmed:
    'Phone number not confirmed. Please verify it first.',
  phone_provider_disabled:
    'Signups via phone and password are disabled.',
  provider_disabled:
    'The specified OAuth provider is disabled on the server.',
  provider_email_needs_verification:
    'OAuth provider did not verify the user’s email. A verification email has been sent.',
  reauthentication_needed:
    'Reauthentication required to perform this action. Please sign in again.',
  reauthentication_not_valid:
    'Reauthentication failed (invalid code). Please try again.',
  refresh_token_already_used:
    'Refresh token has been revoked. Sign in again to obtain a new one.',
  refresh_token_not_found:
    'Refresh token not found. Please sign in again.',
  request_timeout:
    'Request timed out. Please retry.',
  same_password:
    'New password must be different from the current one.',
  saml_assertion_no_email:
    'SAML assertion missing email. Check your IdP configuration.',
  saml_assertion_no_user_id:
    'SAML assertion missing user ID. Check your IdP configuration.',
  saml_entity_id_mismatch:
    'SAML metadata entity ID mismatch. Create a new identity provider instead.',
  saml_idp_already_exists:
    'SAML identity provider already registered (Admin API).',
  saml_idp_not_found:
    'SAML identity provider not found.',
  saml_metadata_fetch_failed:
    'Failed to fetch SAML IdP metadata from the provided URL.',
  saml_provider_disabled:
    'Enterprise SSO with SAML 2.0 is not enabled.',
  saml_relay_state_expired:
    'SAML relay state expired. Please sign in again.',
  saml_relay_state_not_found:
    'SAML relay state not found. Please sign in again.',
  session_expired:
    'User session expired. Please sign in again.',
  session_not_found:
    'Session not found. Please sign in again.',
  signup_disabled:
    'New user sign‑ups are disabled.',
  single_identity_not_deletable:
    'Cannot delete the only identity for this user.',
  sms_send_failed:
    'Failed to send SMS. Check your SMS provider configuration.',
  sso_domain_already_exists:
    'Only one SSO domain allowed per identity provider.',
  sso_provider_not_found:
    'SSO provider not found. Check your parameters.',
  too_many_enrolled_mfa_factors:
    'You have too many enrolled MFA factors. Unenroll one before adding another.',
  unexpected_audience:
    'JWT audience mismatch. Check your token’s audience claim.',
  unexpected_failure:
    'An unexpected error occurred in the Auth service.',
  user_already_exists:
    'User with these credentials already exists.',
  user_banned:
    'User is banned until further notice.',
  user_not_found:
    'User not found.',
  user_sso_managed:
    'This user is managed by SSO; certain fields cannot be updated.',
  validation_failed:
    'One or more parameters are malformed or missing.',
  weak_password:
    'Password does not meet strength requirements. Please choose a stronger password.',
}

export const LOGOUT_ERROR: Record<number, string> = {
  400: 'Please confirm your account first.',
  403: 'Session expired or access denied.',
  422: 'Session error. Please log in again.',
  429: 'Too many requests. Try again soon.',
  500: 'Server error. Please try again later.',
  501: 'Feature not available yet.',
}
